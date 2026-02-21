import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PracticeProblem {
    id: bigint;
    lessonId: bigint;
    topic: string;
    question: string;
    answer: string;
}
export interface ProgressView {
    streak: bigint;
    achievements: Array<string>;
    completedLessons: Array<bigint>;
    practiceScores: Array<[bigint, bigint]>;
    practiceSessions: Array<PracticeSession>;
}
export interface PracticeSession {
    topic: string;
    duration: bigint;
    problemsAttempted: bigint;
    timestamp: bigint;
    correctCount: bigint;
}
export interface Lesson {
    id: bigint;
    title: string;
    topic: string;
    content: string;
    difficulty: bigint;
}
export interface PracticeProgress {
    topic: string;
    fastestTime: bigint;
    attempts: bigint;
    correct: bigint;
}
export interface backendInterface {
    addAchievement(achievement: string): Promise<ProgressView>;
    completeLesson(lessonId: bigint): Promise<ProgressView>;
    getLessons(): Promise<Array<Lesson>>;
    getLessonsByTopic(topic: string): Promise<Array<Lesson>>;
    getPracticeProblems(): Promise<Array<PracticeProblem>>;
    getPracticeProgressByTopic(topic: string): Promise<PracticeProgress>;
    getPracticeSessions(): Promise<Array<PracticeSession>>;
    getProblemsByTopic(topic: string): Promise<Array<PracticeProblem>>;
    getProgress(): Promise<ProgressView | null>;
    initializeContent(): Promise<void>;
    recordPracticeSession(session: PracticeSession): Promise<ProgressView>;
    submitPracticeScore(problemId: bigint, score: bigint): Promise<ProgressView>;
}
