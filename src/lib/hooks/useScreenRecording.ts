import { useState, useRef, useEffect } from "react";
import {
  getMediaStreams,
  createAudioMixer,
  setupRecording,
  cleanupRecording,
  createRecordingBlob,
  calculateRecordingDuration,
} from "@/lib/utils";

export const useScreenRecording = () => {

    const [state, setState] = useState<BunnyRecordingState>({
        isRecording: false,
        recordedBlob: null,
        recordedVideoUrl: "",
        recordingDuration: 0,
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<ExtendedMediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const startTimeRef = useRef<number | null>(null);

    // helper to safely close audio context
    const safeCloseAudioContext = async () => {
        if (audioContextRef.current && audioContextRef.current.state !== "closed") {
            try {
                await audioContextRef.current.close();
            } catch (err) {
                console.error("Error closing AudioContext:", err);
            }
            audioContextRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            stopRecording();
            if (state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl);
            safeCloseAudioContext();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.recordedVideoUrl]);

    const handleRecordingStop = () => {
        const { blob, url } = createRecordingBlob(chunksRef.current);
        const duration = calculateRecordingDuration(startTimeRef.current);

        setState((prev) => ({
            ...prev,
            recordedBlob: blob,
            recordedVideoUrl: url,
            recordingDuration: duration,
            isRecording: false,
        }));
    };

    const startRecording = async (withMic = true) => {
        try {
            stopRecording(); // ensures previous session cleaned up

            const { displayStream, micStream, hasDisplayAudio } =
                await getMediaStreams(withMic);
            const combinedStream = new MediaStream() as ExtendedMediaStream;

            displayStream
                .getVideoTracks()
                .forEach((track: MediaStreamTrack) => combinedStream.addTrack(track));

            // fresh audio context
            await safeCloseAudioContext();
            audioContextRef.current = new AudioContext();

            const audioDestination = createAudioMixer(
                audioContextRef.current,
                displayStream,
                micStream,
                hasDisplayAudio
            );

            audioDestination?.stream
                .getAudioTracks()
                .forEach((track: MediaStreamTrack) => combinedStream.addTrack(track));

            combinedStream._originalStreams = [
                displayStream,
                ...(micStream ? [micStream] : []),
            ];
            streamRef.current = combinedStream;

            mediaRecorderRef.current = setupRecording(combinedStream, {
                onDataAvailable: (e) => e.data.size && chunksRef.current.push(e.data),
                onStop: handleRecordingStop,
            });

            chunksRef.current = [];
            startTimeRef.current = Date.now();
            mediaRecorderRef.current.start(1000);
            setState((prev) => ({ ...prev, isRecording: true }));
            return true;
        } catch (error) {
            console.error("Recording error:", error);
            return false;
        }
    };

    const stopRecording = () => {
        cleanupRecording(
            mediaRecorderRef.current,
            streamRef.current,
            streamRef.current?._originalStreams
        );
        streamRef.current = null;
        setState((prev) => ({ ...prev, isRecording: false }));
        safeCloseAudioContext();
    };

    const resetRecording = () => {
        stopRecording();
        if (state.recordedVideoUrl) URL.revokeObjectURL(state.recordedVideoUrl);
        setState({
            isRecording: false,
            recordedBlob: null,
            recordedVideoUrl: "",
            recordingDuration: 0,
        });
        startTimeRef.current = null;
        safeCloseAudioContext();
    };

    return {
        ...state,
        startRecording,
        stopRecording,
        resetRecording,
    };
};