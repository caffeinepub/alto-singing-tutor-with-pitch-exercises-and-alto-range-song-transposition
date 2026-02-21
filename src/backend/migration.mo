import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
  type OldLesson = {
    id : Nat;
    title : Text;
    content : Text;
    difficulty : Nat;
  };

  type PracticeProblem = {
    id : Nat;
    question : Text;
    answer : Text;
    lessonId : Nat;
    topic : Text;
  };

  type PracticeSession = {
    topic : Text;
    problemsAttempted : Nat;
    correctCount : Nat;
    duration : Nat;
    timestamp : Nat;
  };

  type Progress = {
    completedLessons : List.List<Nat>;
    practiceScores : Map.Map<Nat, Nat>;
    streak : Nat;
    achievements : List.List<Text>;
    practiceSessions : List.List<PracticeSession>;
  };

  type OldActor = {
    lessons : Map.Map<Nat, OldLesson>;
    problems : Map.Map<Nat, PracticeProblem>;
    userProgress : Map.Map<Principal, Progress>;
  };

  type NewLesson = {
    id : Nat;
    title : Text;
    content : Text;
    difficulty : Nat;
    topic : Text;
  };

  type NewActor = {
    lessons : Map.Map<Nat, NewLesson>;
    problems : Map.Map<Nat, PracticeProblem>;
    userProgress : Map.Map<Principal, Progress>;
  };

  public func run(old : OldActor) : NewActor {
    let newLessons = old.lessons.map<Nat, OldLesson, NewLesson>(
      func(_, oldLesson) {
        { oldLesson with topic = getDefaultTopic(oldLesson.id) };
      }
    );
    { old with lessons = newLessons };
  };

  func getDefaultTopic(lessonId : Nat) : Text {
    switch (lessonId) {
      case (1) { "fractions" };
      case (2) { "decimals" };
      case (3) { "percentages" };
      case (4) { "algebra" };
      case (5) { "geometry" };
      case (6) { "ratios" };
      case (_) { "unknown" };
    };
  };
};
