import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type Admin = SchemaBaseInterface & User & {
  __typename?: 'Admin';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: UserType;
  self: User;
  updatedAt: Scalars['DateTime']['output'];
};

export type Answer = {
  _id: Scalars['String']['output'];
  answeredAt?: Maybe<Scalars['DateTime']['output']>;
  correct?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  question: Scalars['String']['output'];
  type: AnswerType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AnswerDiscriminatorInput = {
  answerMultipleChoice?: InputMaybe<AnswerMultipleChoiceInput>;
  answerSingleChoice?: InputMaybe<AnswerSingleChoiceInput>;
  answerText?: InputMaybe<AnswerTextInput>;
  answerTrueOrFalse?: InputMaybe<AnswerTrueOrFalseInput>;
  type: AnswerType;
};

export type AnswerMultipleChoice = Answer & {
  __typename?: 'AnswerMultipleChoice';
  _id: Scalars['String']['output'];
  answeredAt?: Maybe<Scalars['DateTime']['output']>;
  correct?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  question: Scalars['String']['output'];
  type: AnswerType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AnswerMultipleChoiceInput = {
  answeredAt?: InputMaybe<Scalars['DateTime']['input']>;
  optionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  questionId: Scalars['String']['input'];
  type: AnswerType;
};

export type AnswerSingleChoice = Answer & {
  __typename?: 'AnswerSingleChoice';
  _id: Scalars['String']['output'];
  answeredAt?: Maybe<Scalars['DateTime']['output']>;
  correct?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  option?: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  type: AnswerType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AnswerSingleChoiceInput = {
  answeredAt?: InputMaybe<Scalars['DateTime']['input']>;
  optionId?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['String']['input'];
  type: AnswerType;
};

export type AnswerText = Answer & {
  __typename?: 'AnswerText';
  _id: Scalars['String']['output'];
  answeredAt?: Maybe<Scalars['DateTime']['output']>;
  correct?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  question: Scalars['String']['output'];
  text?: Maybe<Scalars['String']['output']>;
  type: AnswerType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AnswerTextInput = {
  answeredAt?: InputMaybe<Scalars['DateTime']['input']>;
  questionId: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
  type: AnswerType;
};

export type AnswerTrueOrFalse = Answer & {
  __typename?: 'AnswerTrueOrFalse';
  _id: Scalars['String']['output'];
  answeredAt?: Maybe<Scalars['DateTime']['output']>;
  correct?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  option?: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  type: AnswerType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AnswerTrueOrFalseInput = {
  answeredAt?: InputMaybe<Scalars['DateTime']['input']>;
  optionId?: InputMaybe<Scalars['String']['input']>;
  questionId: Scalars['String']['input'];
  type: AnswerType;
};

export enum AnswerType {
  MultipleChoice = 'MULTIPLE_CHOICE',
  SingleChoice = 'SINGLE_CHOICE',
  Text = 'TEXT',
  TrueOrFalse = 'TRUE_OR_FALSE'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  authToken: Scalars['String']['output'];
  session: Session;
  user: Admin;
};

export type DeleteQuestionnaireResponse = {
  __typename?: 'DeleteQuestionnaireResponse';
  status: Scalars['String']['output'];
};

export type LogOutResponse = {
  __typename?: 'LogOutResponse';
  session: Session;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminCreateQuestionnaireExam: QuestionnaireExam;
  adminCreateQuestionnaireQuiz: QuestionnaireQuiz;
  adminCreateQuestionnaireSurvey: QuestionnaireSurvey;
  adminDeleteQuestionnaire?: Maybe<DeleteQuestionnaireResponse>;
  adminUpdateQuestionnaireExam: QuestionnaireExam;
  adminUpdateQuestionnaireQuiz: QuestionnaireQuiz;
  adminUpdateQuestionnaireSurvey: QuestionnaireSurvey;
  publicSignIn: AuthResponse;
  publicSignOut: SignOutResponse;
  publicSignUp: AuthResponse;
  publicUpsertQuestionnaireResponse: PublicUpsertResponse;
  userlogOut: LogOutResponse;
};


export type MutationAdminCreateQuestionnaireExamArgs = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  maxRetryAmount?: InputMaybe<Scalars['Int']['input']>;
  passingGradePercent?: InputMaybe<Scalars['Float']['input']>;
  questions: Array<QuestionDiscriminatorInput>;
  randomizeQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};


export type MutationAdminCreateQuestionnaireQuizArgs = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  questions: Array<QuestionDiscriminatorInput>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};


export type MutationAdminCreateQuestionnaireSurveyArgs = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  questions: Array<QuestionDiscriminatorInput>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};


export type MutationAdminDeleteQuestionnaireArgs = {
  questionnaireSharedId: Scalars['String']['input'];
};


export type MutationAdminUpdateQuestionnaireExamArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  maxRetryAmount?: InputMaybe<Scalars['Int']['input']>;
  passingGradePercent?: InputMaybe<Scalars['Float']['input']>;
  questionMethods?: InputMaybe<Array<QuestionMethodInput>>;
  questionOrder?: InputMaybe<Array<QuestionOrderInput>>;
  questionnaireId: Scalars['String']['input'];
  randomizeQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAdminUpdateQuestionnaireQuizArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  questionMethods?: InputMaybe<Array<QuestionMethodInput>>;
  questionOrder?: InputMaybe<Array<QuestionOrderInput>>;
  questionnaireId: Scalars['String']['input'];
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAdminUpdateQuestionnaireSurveyArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  questionMethods?: InputMaybe<Array<QuestionMethodInput>>;
  questionOrder?: InputMaybe<Array<QuestionOrderInput>>;
  questionnaireId: Scalars['String']['input'];
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPublicSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationPublicSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationPublicUpsertQuestionnaireResponseArgs = {
  answers: Array<AnswerDiscriminatorInput>;
  completedAt: Scalars['DateTime']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  questionnaireId: Scalars['String']['input'];
  startedAt: Scalars['DateTime']['input'];
};

export type Option = {
  __typename?: 'Option';
  _id: Scalars['String']['output'];
  correct?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  feedbackAfterSubmit?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OptionInput = {
  correct?: InputMaybe<Scalars['Boolean']['input']>;
  feedbackAfterSubmit?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type OptionMetrics = {
  __typename?: 'OptionMetrics';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  selectedCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PublicUpsertResponse = {
  __typename?: 'PublicUpsertResponse';
  respondentToken: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminFetchQuestionnaire?: Maybe<Questionnaire>;
  adminFetchQuestionnaires: Array<Questionnaire>;
  fetchAdmin?: Maybe<Admin>;
  publicFetchQuestionnaire?: Maybe<Questionnaire>;
};


export type QueryAdminFetchQuestionnaireArgs = {
  latest?: InputMaybe<Scalars['Boolean']['input']>;
  questionnaireId?: InputMaybe<Scalars['String']['input']>;
  questionnaireSharedId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAdminFetchQuestionnairesArgs = {
  latest?: InputMaybe<Scalars['Boolean']['input']>;
  questionnaireIds?: InputMaybe<Array<Scalars['String']['input']>>;
  questionnaireSharedIds?: InputMaybe<Array<Scalars['String']['input']>>;
  textFilter?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFetchAdminArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPublicFetchQuestionnaireArgs = {
  questionnaireId?: InputMaybe<Scalars['String']['input']>;
  questionnaireSharedId?: InputMaybe<Scalars['String']['input']>;
};

export type Question = {
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  showCorrectAnswer: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: QuestionType;
  updatedAt: Scalars['DateTime']['output'];
  weight?: Maybe<Scalars['Int']['output']>;
};

export type QuestionDiscriminatorInput = {
  questionMultipleChoice?: InputMaybe<QuestionMultipleChoiceInput>;
  questionSingleChoice?: InputMaybe<QuestionSingleChoiceInput>;
  questionText?: InputMaybe<QuestionTextInput>;
  questionTrueOrFalse?: InputMaybe<QuestionTrueOrFalseInput>;
  type: QuestionType;
};

export type QuestionMethodInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  questionDiscriminator?: InputMaybe<QuestionDiscriminatorInput>;
  questionId?: InputMaybe<Scalars['String']['input']>;
  type: QuestionMethodType;
};

export enum QuestionMethodType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type QuestionMetrics = {
  _id: Scalars['String']['output'];
  answerCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  type: QuestionType;
  unansweredCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type QuestionMultipleChoice = Question & {
  __typename?: 'QuestionMultipleChoice';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  options: Array<Option>;
  randomizeOptions: Scalars['Boolean']['output'];
  required: Scalars['Boolean']['output'];
  rightAnswerFeedback?: Maybe<Scalars['String']['output']>;
  showCorrectAnswer: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: QuestionType;
  updatedAt: Scalars['DateTime']['output'];
  weight?: Maybe<Scalars['Int']['output']>;
  wrongAnswerFeedback?: Maybe<Scalars['String']['output']>;
};

export type QuestionMultipleChoiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  options: Array<OptionInput>;
  randomizeOptions?: InputMaybe<Scalars['Boolean']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  rightAnswerFeedback?: InputMaybe<Scalars['String']['input']>;
  showCorrectAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: QuestionType;
  weight?: InputMaybe<Scalars['Int']['input']>;
  wrongAnswerFeedback?: InputMaybe<Scalars['String']['input']>;
};

export type QuestionMultipleChoiceMetrics = QuestionMetrics & {
  __typename?: 'QuestionMultipleChoiceMetrics';
  _id: Scalars['String']['output'];
  answerCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  options: Array<OptionMetrics>;
  rightAnswerCount: Scalars['Int']['output'];
  type: QuestionType;
  unansweredCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wrongAnswerCount: Scalars['Int']['output'];
};

export type QuestionOrderInput = {
  index?: InputMaybe<Scalars['Int']['input']>;
  questionId?: InputMaybe<Scalars['String']['input']>;
};

export type QuestionSingleChoice = Question & {
  __typename?: 'QuestionSingleChoice';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  options: Array<Option>;
  randomizeOptions: Scalars['Boolean']['output'];
  required: Scalars['Boolean']['output'];
  rightAnswerFeedback?: Maybe<Scalars['String']['output']>;
  showCorrectAnswer: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: QuestionType;
  updatedAt: Scalars['DateTime']['output'];
  weight?: Maybe<Scalars['Int']['output']>;
  wrongAnswerFeedback?: Maybe<Scalars['String']['output']>;
};

export type QuestionSingleChoiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  options: Array<OptionInput>;
  randomizeOptions?: InputMaybe<Scalars['Boolean']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  rightAnswerFeedback?: InputMaybe<Scalars['String']['input']>;
  showCorrectAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: QuestionType;
  weight?: InputMaybe<Scalars['Int']['input']>;
  wrongAnswerFeedback?: InputMaybe<Scalars['String']['input']>;
};

export type QuestionSingleChoiceMetrics = QuestionMetrics & {
  __typename?: 'QuestionSingleChoiceMetrics';
  _id: Scalars['String']['output'];
  answerCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  options: Array<OptionMetrics>;
  rightAnswerCount: Scalars['Int']['output'];
  type: QuestionType;
  unansweredCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wrongAnswerCount: Scalars['Int']['output'];
};

export type QuestionText = Question & {
  __typename?: 'QuestionText';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  feedbackAfterSubmit?: Maybe<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  showCorrectAnswer: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: QuestionType;
  updatedAt: Scalars['DateTime']['output'];
  weight?: Maybe<Scalars['Int']['output']>;
};

export type QuestionTextInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  feedbackAfterSubmit?: InputMaybe<Scalars['String']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  showCorrectAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: QuestionType;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type QuestionTextMetrics = QuestionMetrics & {
  __typename?: 'QuestionTextMetrics';
  _id: Scalars['String']['output'];
  answerCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  type: QuestionType;
  unansweredCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type QuestionTrueOrFalse = Question & {
  __typename?: 'QuestionTrueOrFalse';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  options: Array<Option>;
  required: Scalars['Boolean']['output'];
  rightAnswerFeedback?: Maybe<Scalars['String']['output']>;
  showCorrectAnswer: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: QuestionType;
  updatedAt: Scalars['DateTime']['output'];
  weight?: Maybe<Scalars['Int']['output']>;
  wrongAnswerFeedback?: Maybe<Scalars['String']['output']>;
};

export type QuestionTrueOrFalseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  options: Array<OptionInput>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  rightAnswerFeedback?: InputMaybe<Scalars['String']['input']>;
  showCorrectAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type: QuestionType;
  weight?: InputMaybe<Scalars['Int']['input']>;
  wrongAnswerFeedback?: InputMaybe<Scalars['String']['input']>;
};

export type QuestionTrueOrFalseMetrics = QuestionMetrics & {
  __typename?: 'QuestionTrueOrFalseMetrics';
  _id: Scalars['String']['output'];
  answerCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  options: Array<OptionMetrics>;
  rightAnswerCount: Scalars['Int']['output'];
  type: QuestionType;
  unansweredCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  wrongAnswerCount: Scalars['Int']['output'];
};

export enum QuestionType {
  MultipleChoice = 'MULTIPLE_CHOICE',
  SingleChoice = 'SINGLE_CHOICE',
  Text = 'TEXT',
  TrueOrFalse = 'TRUE_OR_FALSE'
}

export type Questionnaire = {
  _id: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  latest: Scalars['Boolean']['output'];
  metrics: QuestionnaireMetrics;
  questions: Array<Question>;
  requireEmail: Scalars['Boolean']['output'];
  requireName: Scalars['Boolean']['output'];
  sharedCreatedAt: Scalars['DateTime']['output'];
  sharedId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: QuestionnaireType;
  updatedAt: Scalars['DateTime']['output'];
  user: Admin;
};

export type QuestionnaireExam = Questionnaire & SchemaBaseInterface & {
  __typename?: 'QuestionnaireExam';
  _id: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  latest: Scalars['Boolean']['output'];
  maxRetryAmount?: Maybe<Scalars['Float']['output']>;
  metrics: QuestionnaireMetrics;
  passingGradePercent?: Maybe<Scalars['Float']['output']>;
  questions: Array<Question>;
  randomizeQuestions: Scalars['Boolean']['output'];
  requireEmail: Scalars['Boolean']['output'];
  requireName: Scalars['Boolean']['output'];
  sharedCreatedAt: Scalars['DateTime']['output'];
  sharedId: Scalars['String']['output'];
  timeLimit?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  type: QuestionnaireType;
  updatedAt: Scalars['DateTime']['output'];
  user: Admin;
};

export type QuestionnaireMetrics = {
  __typename?: 'QuestionnaireMetrics';
  _id: Scalars['String']['output'];
  avgAnswerTime: Scalars['Float']['output'];
  avgAttemptCount: Scalars['Float']['output'];
  /** A JSON string of the questionnaire metrics map (by location) */
  byLocationMap?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  questionMetrics: Array<QuestionMetrics>;
  totalAnswerTime: Scalars['Int']['output'];
  totalAttemptCount: Scalars['Int']['output'];
  totalResponseCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type QuestionnaireQuiz = Questionnaire & SchemaBaseInterface & {
  __typename?: 'QuestionnaireQuiz';
  _id: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  latest: Scalars['Boolean']['output'];
  metrics: QuestionnaireMetrics;
  questions: Array<Question>;
  requireEmail: Scalars['Boolean']['output'];
  requireName: Scalars['Boolean']['output'];
  sharedCreatedAt: Scalars['DateTime']['output'];
  sharedId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: QuestionnaireType;
  updatedAt: Scalars['DateTime']['output'];
  user: Admin;
};

export type QuestionnaireSurvey = Questionnaire & SchemaBaseInterface & {
  __typename?: 'QuestionnaireSurvey';
  _id: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  bgColor?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  latest: Scalars['Boolean']['output'];
  metrics: QuestionnaireMetrics;
  questions: Array<Question>;
  requireEmail: Scalars['Boolean']['output'];
  requireName: Scalars['Boolean']['output'];
  sharedCreatedAt: Scalars['DateTime']['output'];
  sharedId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: QuestionnaireType;
  updatedAt: Scalars['DateTime']['output'];
  user: Admin;
};

export enum QuestionnaireType {
  QuestionnaireExam = 'QuestionnaireExam',
  QuestionnaireQuiz = 'QuestionnaireQuiz',
  QuestionnaireSurvey = 'QuestionnaireSurvey'
}

export type Respondent = SchemaBaseInterface & User & {
  __typename?: 'Respondent';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  location?: Maybe<RespondentLocation>;
  name?: Maybe<Scalars['String']['output']>;
  questionnaire: Questionnaire;
  role: UserType;
  self: Respondent;
  updatedAt: Scalars['DateTime']['output'];
};

export type RespondentLocation = {
  __typename?: 'RespondentLocation';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  region: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
};

export type Response = {
  __typename?: 'Response';
  _id: Scalars['String']['output'];
  answers: Array<Answer>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  questionnaire: Questionnaire;
  respondent: Respondent;
  self: Response;
  startedAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SchemaBaseInterface = {
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Session = {
  __typename?: 'Session';
  _id: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  ip: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userAgent: Scalars['String']['output'];
};

export type SignOutResponse = {
  __typename?: 'SignOutResponse';
  status: Scalars['String']['output'];
};

export type User = {
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  role: UserType;
  self: User;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserType {
  Admin = 'Admin',
  Respondent = 'Respondent',
  User = 'User'
}

export type SignUpMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', publicSignUp: { __typename?: 'AuthResponse', authToken: string, session: { __typename?: 'Session', _id: string, ip: string, active: boolean, userAgent: string, expiresAt: Date, updatedAt: Date, createdAt: Date }, user: { __typename?: 'Admin', _id: string, email: string, name: string, role: UserType, createdAt: Date, updatedAt: Date } } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', publicSignIn: { __typename?: 'AuthResponse', authToken: string, session: { __typename?: 'Session', _id: string, ip: string, active: boolean, userAgent: string, expiresAt: Date, updatedAt: Date, createdAt: Date }, user: { __typename?: 'Admin', _id: string, email: string, name: string, role: UserType, createdAt: Date, updatedAt: Date } } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', publicSignOut: { __typename?: 'SignOutResponse', status: string } };

export type CreateSurveyMutationVariables = Exact<{
  title: Scalars['String']['input'];
  requireEmail: Scalars['Boolean']['input'];
  requireName: Scalars['Boolean']['input'];
  questions: Array<QuestionDiscriminatorInput> | QuestionDiscriminatorInput;
  description?: InputMaybe<Scalars['String']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateSurveyMutation = { __typename?: 'Mutation', adminCreateQuestionnaireSurvey: { __typename?: 'QuestionnaireSurvey', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } };

export type CreateQuizMutationVariables = Exact<{
  title: Scalars['String']['input'];
  requireEmail: Scalars['Boolean']['input'];
  requireName: Scalars['Boolean']['input'];
  questions: Array<QuestionDiscriminatorInput> | QuestionDiscriminatorInput;
  description?: InputMaybe<Scalars['String']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', adminCreateQuestionnaireQuiz: { __typename?: 'QuestionnaireQuiz', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } };

export type CreateExamMutationVariables = Exact<{
  title: Scalars['String']['input'];
  requireEmail: Scalars['Boolean']['input'];
  requireName: Scalars['Boolean']['input'];
  randomizeQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  maxRetryAmount?: InputMaybe<Scalars['Int']['input']>;
  questions: Array<QuestionDiscriminatorInput> | QuestionDiscriminatorInput;
  description?: InputMaybe<Scalars['String']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateExamMutation = { __typename?: 'Mutation', adminCreateQuestionnaireExam: { __typename?: 'QuestionnaireExam', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, randomizeQuestions: boolean, createdAt: Date, updatedAt: Date, timeLimit?: number | null, maxRetryAmount?: number | null, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } };

export type UpdateSurveyMutationVariables = Exact<{
  questionnaireId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  questionOrder?: InputMaybe<Array<QuestionOrderInput> | QuestionOrderInput>;
  questionMethods?: InputMaybe<Array<QuestionMethodInput> | QuestionMethodInput>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSurveyMutation = { __typename?: 'Mutation', adminUpdateQuestionnaireSurvey: { __typename?: 'QuestionnaireSurvey', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } };

export type UpdateQuizMutationVariables = Exact<{
  questionnaireId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  questionOrder?: InputMaybe<Array<QuestionOrderInput> | QuestionOrderInput>;
  questionMethods?: InputMaybe<Array<QuestionMethodInput> | QuestionMethodInput>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', adminUpdateQuestionnaireQuiz: { __typename?: 'QuestionnaireQuiz', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } };

export type UpdateExamMutationVariables = Exact<{
  questionnaireId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  questionOrder?: InputMaybe<Array<QuestionOrderInput> | QuestionOrderInput>;
  questionMethods?: InputMaybe<Array<QuestionMethodInput> | QuestionMethodInput>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  randomizeQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  maxRetryAmount?: InputMaybe<Scalars['Int']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateExamMutation = { __typename?: 'Mutation', adminUpdateQuestionnaireExam: { __typename?: 'QuestionnaireExam', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, randomizeQuestions: boolean, createdAt: Date, updatedAt: Date, timeLimit?: number | null, maxRetryAmount?: number | null, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } };

export type QuestionnaireMetricsFragmentFragment = { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> };

export type QuestionSingleChoiceFragmentFragment = { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> };

export type QuestionMultipleChoiceFragmentFragment = { __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> };

export type QuestionTrueOrFalseFragmentFragment = { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> };

export type QuestionTextFragmentFragment = { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null };

export type SurveyFragmentFragment = { __typename?: 'QuestionnaireSurvey', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> };

export type QuizFragmentFragment = { __typename?: 'QuestionnaireQuiz', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> };

export type ExamFragmentFragment = { __typename?: 'QuestionnaireExam', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, randomizeQuestions: boolean, createdAt: Date, updatedAt: Date, timeLimit?: number | null, maxRetryAmount?: number | null, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> };

export type DeleteQuestionnaireMutationVariables = Exact<{
  questionnaireSharedId: Scalars['String']['input'];
}>;


export type DeleteQuestionnaireMutation = { __typename?: 'Mutation', adminDeleteQuestionnaire?: { __typename?: 'DeleteQuestionnaireResponse', status: string } | null };

export type FetchQuestionnaireQueryVariables = Exact<{
  questionnaireId?: InputMaybe<Scalars['String']['input']>;
  questionnaireSharedId?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchQuestionnaireQuery = { __typename?: 'Query', adminFetchQuestionnaire?: { __typename?: 'QuestionnaireExam', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, randomizeQuestions: boolean, createdAt: Date, updatedAt: Date, timeLimit?: number | null, maxRetryAmount?: number | null, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } | { __typename?: 'QuestionnaireQuiz', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } | { __typename?: 'QuestionnaireSurvey', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } | null };

export type PublicFetchQuestionnaireQueryVariables = Exact<{
  questionnaireId?: InputMaybe<Scalars['String']['input']>;
  questionnaireSharedId?: InputMaybe<Scalars['String']['input']>;
}>;


export type PublicFetchQuestionnaireQuery = { __typename?: 'Query', publicFetchQuestionnaire?: { __typename?: 'QuestionnaireExam', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, randomizeQuestions: boolean, createdAt: Date, updatedAt: Date, timeLimit?: number | null, maxRetryAmount?: number | null, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } | { __typename?: 'QuestionnaireQuiz', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } | { __typename?: 'QuestionnaireSurvey', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } | null };

export type FetchQuestionnairesQueryVariables = Exact<{
  latest?: InputMaybe<Scalars['Boolean']['input']>;
  textFilter?: InputMaybe<Scalars['String']['input']>;
}>;


export type FetchQuestionnairesQuery = { __typename?: 'Query', adminFetchQuestionnaires: Array<{ __typename?: 'QuestionnaireExam', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, randomizeQuestions: boolean, createdAt: Date, updatedAt: Date, timeLimit?: number | null, maxRetryAmount?: number | null, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } | { __typename?: 'QuestionnaireQuiz', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', _id: string, type: QuestionType, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> } | { __typename?: 'QuestionnaireSurvey', _id: string, sharedId: string, type: QuestionnaireType, requireEmail: boolean, requireName: boolean, title: string, description: string, active: boolean, color?: string | null, bgColor?: string | null, createdAt: Date, updatedAt: Date, metrics: { __typename?: 'QuestionnaireMetrics', totalResponseCount: number, totalAttemptCount: number, totalAnswerTime: number, avgAnswerTime: number, avgAttemptCount: number, byLocationMap?: string | null, questionMetrics: Array<{ __typename?: 'QuestionMultipleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionSingleChoiceMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> } | { __typename?: 'QuestionTextMetrics', answerCount: number, unansweredCount: number } | { __typename?: 'QuestionTrueOrFalseMetrics', answerCount: number, unansweredCount: number, rightAnswerCount: number, wrongAnswerCount: number, options: Array<{ __typename?: 'OptionMetrics', selectedCount: number }> }> }, questions: Array<{ __typename?: 'QuestionMultipleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionSingleChoice', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, randomizeOptions: boolean, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> } | { __typename?: 'QuestionText', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, feedbackAfterSubmit?: string | null } | { __typename?: 'QuestionTrueOrFalse', type: QuestionType, _id: string, showCorrectAnswer: boolean, title?: string | null, weight?: number | null, required: boolean, description?: string | null, wrongAnswerFeedback?: string | null, rightAnswerFeedback?: string | null, options: Array<{ __typename?: 'Option', _id: string, title: string, correct?: boolean | null, feedbackAfterSubmit?: string | null }> }> }> };

export type RespondQuestionnaireMutationVariables = Exact<{
  answers: Array<AnswerDiscriminatorInput> | AnswerDiscriminatorInput;
  questionnaireId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  startedAt: Scalars['DateTime']['input'];
  completedAt: Scalars['DateTime']['input'];
}>;


export type RespondQuestionnaireMutation = { __typename?: 'Mutation', publicUpsertQuestionnaireResponse: { __typename?: 'PublicUpsertResponse', respondentToken: string } };

export const QuestionnaireMetricsFragmentFragmentDoc = gql`
    fragment QuestionnaireMetricsFragment on QuestionnaireMetrics {
  totalResponseCount
  totalAttemptCount
  totalAnswerTime
  avgAnswerTime
  avgAttemptCount
  byLocationMap
  questionMetrics {
    ... on QuestionSingleChoiceMetrics {
      answerCount
      unansweredCount
      rightAnswerCount
      wrongAnswerCount
      options {
        selectedCount
      }
    }
    ... on QuestionMultipleChoiceMetrics {
      answerCount
      unansweredCount
      rightAnswerCount
      wrongAnswerCount
      options {
        selectedCount
      }
    }
    ... on QuestionTrueOrFalseMetrics {
      answerCount
      unansweredCount
      rightAnswerCount
      wrongAnswerCount
      options {
        selectedCount
      }
    }
    ... on QuestionTextMetrics {
      answerCount
      unansweredCount
    }
  }
}
    `;
export const QuestionSingleChoiceFragmentFragmentDoc = gql`
    fragment QuestionSingleChoiceFragment on QuestionSingleChoice {
  _id
  type
  showCorrectAnswer
  title
  weight
  required
  description
  options {
    _id
    title
    correct
    feedbackAfterSubmit
  }
  wrongAnswerFeedback
  rightAnswerFeedback
  randomizeOptions
}
    `;
export const QuestionMultipleChoiceFragmentFragmentDoc = gql`
    fragment QuestionMultipleChoiceFragment on QuestionMultipleChoice {
  _id
  type
  showCorrectAnswer
  title
  weight
  required
  description
  options {
    _id
    title
    correct
    feedbackAfterSubmit
  }
  wrongAnswerFeedback
  rightAnswerFeedback
  randomizeOptions
}
    `;
export const QuestionTrueOrFalseFragmentFragmentDoc = gql`
    fragment QuestionTrueOrFalseFragment on QuestionTrueOrFalse {
  _id
  type
  showCorrectAnswer
  title
  weight
  required
  description
  options {
    _id
    title
    correct
    feedbackAfterSubmit
  }
  wrongAnswerFeedback
  rightAnswerFeedback
}
    `;
export const QuestionTextFragmentFragmentDoc = gql`
    fragment QuestionTextFragment on QuestionText {
  _id
  type
  showCorrectAnswer
  title
  weight
  required
  description
  feedbackAfterSubmit
}
    `;
export const SurveyFragmentFragmentDoc = gql`
    fragment SurveyFragment on QuestionnaireSurvey {
  _id
  sharedId
  type
  requireEmail
  requireName
  title
  description
  active
  color
  bgColor
  metrics {
    ...QuestionnaireMetricsFragment
  }
  questions {
    type
    ... on QuestionSingleChoice {
      ...QuestionSingleChoiceFragment
    }
    ... on QuestionMultipleChoice {
      ...QuestionMultipleChoiceFragment
    }
    ... on QuestionTrueOrFalse {
      ...QuestionTrueOrFalseFragment
    }
    ... on QuestionText {
      ...QuestionTextFragment
    }
  }
  createdAt
  updatedAt
}
    ${QuestionnaireMetricsFragmentFragmentDoc}
${QuestionSingleChoiceFragmentFragmentDoc}
${QuestionMultipleChoiceFragmentFragmentDoc}
${QuestionTrueOrFalseFragmentFragmentDoc}
${QuestionTextFragmentFragmentDoc}`;
export const QuizFragmentFragmentDoc = gql`
    fragment QuizFragment on QuestionnaireQuiz {
  _id
  sharedId
  type
  requireEmail
  requireName
  title
  description
  active
  color
  bgColor
  metrics {
    ...QuestionnaireMetricsFragment
  }
  questions {
    ... on QuestionSingleChoice {
      ...QuestionSingleChoiceFragment
    }
    ... on QuestionMultipleChoice {
      ...QuestionMultipleChoiceFragment
    }
    ... on QuestionTrueOrFalse {
      ...QuestionTrueOrFalseFragment
    }
    ... on QuestionText {
      ...QuestionTextFragment
    }
  }
  createdAt
  updatedAt
}
    ${QuestionnaireMetricsFragmentFragmentDoc}
${QuestionSingleChoiceFragmentFragmentDoc}
${QuestionMultipleChoiceFragmentFragmentDoc}
${QuestionTrueOrFalseFragmentFragmentDoc}
${QuestionTextFragmentFragmentDoc}`;
export const ExamFragmentFragmentDoc = gql`
    fragment ExamFragment on QuestionnaireExam {
  _id
  sharedId
  type
  requireEmail
  requireName
  title
  description
  active
  color
  bgColor
  metrics {
    ...QuestionnaireMetricsFragment
  }
  randomizeQuestions
  questions {
    ... on QuestionSingleChoice {
      ...QuestionSingleChoiceFragment
    }
    ... on QuestionMultipleChoice {
      ...QuestionMultipleChoiceFragment
    }
    ... on QuestionTrueOrFalse {
      ...QuestionTrueOrFalseFragment
    }
    ... on QuestionText {
      ...QuestionTextFragment
    }
  }
  createdAt
  updatedAt
  timeLimit
  maxRetryAmount
  randomizeQuestions
}
    ${QuestionnaireMetricsFragmentFragmentDoc}
${QuestionSingleChoiceFragmentFragmentDoc}
${QuestionMultipleChoiceFragmentFragmentDoc}
${QuestionTrueOrFalseFragmentFragmentDoc}
${QuestionTextFragmentFragmentDoc}`;
export const SignUpDocument = gql`
    mutation SignUp($name: String!, $email: String!, $password: String!) {
  publicSignUp(name: $name, email: $email, password: $password) {
    authToken
    session {
      _id
      ip
      active
      userAgent
      expiresAt
      updatedAt
      createdAt
    }
    user {
      _id
      email
      name
      role
      createdAt
      updatedAt
    }
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  publicSignIn(email: $email, password: $password) {
    authToken
    session {
      _id
      ip
      active
      userAgent
      expiresAt
      updatedAt
      createdAt
    }
    user {
      _id
      email
      name
      role
      createdAt
      updatedAt
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation signOut {
  publicSignOut {
    status
  }
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const CreateSurveyDocument = gql`
    mutation CreateSurvey($title: String!, $requireEmail: Boolean!, $requireName: Boolean!, $questions: [QuestionDiscriminatorInput!]!, $description: String, $bgColor: String, $color: String) {
  adminCreateQuestionnaireSurvey(
    title: $title
    requireEmail: $requireEmail
    requireName: $requireName
    questions: $questions
    description: $description
    bgColor: $bgColor
    color: $color
  ) {
    ...SurveyFragment
  }
}
    ${SurveyFragmentFragmentDoc}`;
export type CreateSurveyMutationFn = Apollo.MutationFunction<CreateSurveyMutation, CreateSurveyMutationVariables>;

/**
 * __useCreateSurveyMutation__
 *
 * To run a mutation, you first call `useCreateSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSurveyMutation, { data, loading, error }] = useCreateSurveyMutation({
 *   variables: {
 *      title: // value for 'title'
 *      requireEmail: // value for 'requireEmail'
 *      requireName: // value for 'requireName'
 *      questions: // value for 'questions'
 *      description: // value for 'description'
 *      bgColor: // value for 'bgColor'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreateSurveyMutation(baseOptions?: Apollo.MutationHookOptions<CreateSurveyMutation, CreateSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSurveyMutation, CreateSurveyMutationVariables>(CreateSurveyDocument, options);
      }
export type CreateSurveyMutationHookResult = ReturnType<typeof useCreateSurveyMutation>;
export type CreateSurveyMutationResult = Apollo.MutationResult<CreateSurveyMutation>;
export type CreateSurveyMutationOptions = Apollo.BaseMutationOptions<CreateSurveyMutation, CreateSurveyMutationVariables>;
export const CreateQuizDocument = gql`
    mutation CreateQuiz($title: String!, $requireEmail: Boolean!, $requireName: Boolean!, $questions: [QuestionDiscriminatorInput!]!, $description: String, $bgColor: String, $color: String) {
  adminCreateQuestionnaireQuiz(
    title: $title
    requireEmail: $requireEmail
    requireName: $requireName
    questions: $questions
    description: $description
    bgColor: $bgColor
    color: $color
  ) {
    ...QuizFragment
  }
}
    ${QuizFragmentFragmentDoc}`;
export type CreateQuizMutationFn = Apollo.MutationFunction<CreateQuizMutation, CreateQuizMutationVariables>;

/**
 * __useCreateQuizMutation__
 *
 * To run a mutation, you first call `useCreateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizMutation, { data, loading, error }] = useCreateQuizMutation({
 *   variables: {
 *      title: // value for 'title'
 *      requireEmail: // value for 'requireEmail'
 *      requireName: // value for 'requireName'
 *      questions: // value for 'questions'
 *      description: // value for 'description'
 *      bgColor: // value for 'bgColor'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreateQuizMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizMutation, CreateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(CreateQuizDocument, options);
      }
export type CreateQuizMutationHookResult = ReturnType<typeof useCreateQuizMutation>;
export type CreateQuizMutationResult = Apollo.MutationResult<CreateQuizMutation>;
export type CreateQuizMutationOptions = Apollo.BaseMutationOptions<CreateQuizMutation, CreateQuizMutationVariables>;
export const CreateExamDocument = gql`
    mutation CreateExam($title: String!, $requireEmail: Boolean!, $requireName: Boolean!, $randomizeQuestions: Boolean, $timeLimit: Int, $maxRetryAmount: Int, $questions: [QuestionDiscriminatorInput!]!, $description: String, $bgColor: String, $color: String) {
  adminCreateQuestionnaireExam(
    title: $title
    requireEmail: $requireEmail
    requireName: $requireName
    randomizeQuestions: $randomizeQuestions
    timeLimit: $timeLimit
    maxRetryAmount: $maxRetryAmount
    questions: $questions
    description: $description
    bgColor: $bgColor
    color: $color
  ) {
    ...ExamFragment
  }
}
    ${ExamFragmentFragmentDoc}`;
export type CreateExamMutationFn = Apollo.MutationFunction<CreateExamMutation, CreateExamMutationVariables>;

/**
 * __useCreateExamMutation__
 *
 * To run a mutation, you first call `useCreateExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExamMutation, { data, loading, error }] = useCreateExamMutation({
 *   variables: {
 *      title: // value for 'title'
 *      requireEmail: // value for 'requireEmail'
 *      requireName: // value for 'requireName'
 *      randomizeQuestions: // value for 'randomizeQuestions'
 *      timeLimit: // value for 'timeLimit'
 *      maxRetryAmount: // value for 'maxRetryAmount'
 *      questions: // value for 'questions'
 *      description: // value for 'description'
 *      bgColor: // value for 'bgColor'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreateExamMutation(baseOptions?: Apollo.MutationHookOptions<CreateExamMutation, CreateExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExamMutation, CreateExamMutationVariables>(CreateExamDocument, options);
      }
export type CreateExamMutationHookResult = ReturnType<typeof useCreateExamMutation>;
export type CreateExamMutationResult = Apollo.MutationResult<CreateExamMutation>;
export type CreateExamMutationOptions = Apollo.BaseMutationOptions<CreateExamMutation, CreateExamMutationVariables>;
export const UpdateSurveyDocument = gql`
    mutation UpdateSurvey($questionnaireId: String!, $title: String, $questionOrder: [QuestionOrderInput!], $questionMethods: [QuestionMethodInput!], $requireEmail: Boolean, $requireName: Boolean, $description: String, $bgColor: String, $color: String) {
  adminUpdateQuestionnaireSurvey(
    questionnaireId: $questionnaireId
    title: $title
    questionMethods: $questionMethods
    questionOrder: $questionOrder
    requireEmail: $requireEmail
    requireName: $requireName
    description: $description
    bgColor: $bgColor
    color: $color
  ) {
    ...SurveyFragment
  }
}
    ${SurveyFragmentFragmentDoc}`;
export type UpdateSurveyMutationFn = Apollo.MutationFunction<UpdateSurveyMutation, UpdateSurveyMutationVariables>;

/**
 * __useUpdateSurveyMutation__
 *
 * To run a mutation, you first call `useUpdateSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSurveyMutation, { data, loading, error }] = useUpdateSurveyMutation({
 *   variables: {
 *      questionnaireId: // value for 'questionnaireId'
 *      title: // value for 'title'
 *      questionOrder: // value for 'questionOrder'
 *      questionMethods: // value for 'questionMethods'
 *      requireEmail: // value for 'requireEmail'
 *      requireName: // value for 'requireName'
 *      description: // value for 'description'
 *      bgColor: // value for 'bgColor'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useUpdateSurveyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSurveyMutation, UpdateSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSurveyMutation, UpdateSurveyMutationVariables>(UpdateSurveyDocument, options);
      }
export type UpdateSurveyMutationHookResult = ReturnType<typeof useUpdateSurveyMutation>;
export type UpdateSurveyMutationResult = Apollo.MutationResult<UpdateSurveyMutation>;
export type UpdateSurveyMutationOptions = Apollo.BaseMutationOptions<UpdateSurveyMutation, UpdateSurveyMutationVariables>;
export const UpdateQuizDocument = gql`
    mutation UpdateQuiz($questionnaireId: String!, $title: String, $questionOrder: [QuestionOrderInput!], $questionMethods: [QuestionMethodInput!], $requireEmail: Boolean, $requireName: Boolean, $description: String, $bgColor: String, $color: String) {
  adminUpdateQuestionnaireQuiz(
    questionnaireId: $questionnaireId
    title: $title
    questionMethods: $questionMethods
    questionOrder: $questionOrder
    requireEmail: $requireEmail
    requireName: $requireName
    description: $description
    bgColor: $bgColor
    color: $color
  ) {
    ...QuizFragment
  }
}
    ${QuizFragmentFragmentDoc}`;
export type UpdateQuizMutationFn = Apollo.MutationFunction<UpdateQuizMutation, UpdateQuizMutationVariables>;

/**
 * __useUpdateQuizMutation__
 *
 * To run a mutation, you first call `useUpdateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuizMutation, { data, loading, error }] = useUpdateQuizMutation({
 *   variables: {
 *      questionnaireId: // value for 'questionnaireId'
 *      title: // value for 'title'
 *      questionOrder: // value for 'questionOrder'
 *      questionMethods: // value for 'questionMethods'
 *      requireEmail: // value for 'requireEmail'
 *      requireName: // value for 'requireName'
 *      description: // value for 'description'
 *      bgColor: // value for 'bgColor'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useUpdateQuizMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuizMutation, UpdateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuizMutation, UpdateQuizMutationVariables>(UpdateQuizDocument, options);
      }
export type UpdateQuizMutationHookResult = ReturnType<typeof useUpdateQuizMutation>;
export type UpdateQuizMutationResult = Apollo.MutationResult<UpdateQuizMutation>;
export type UpdateQuizMutationOptions = Apollo.BaseMutationOptions<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const UpdateExamDocument = gql`
    mutation UpdateExam($questionnaireId: String!, $title: String, $questionOrder: [QuestionOrderInput!], $questionMethods: [QuestionMethodInput!], $requireEmail: Boolean, $requireName: Boolean, $description: String, $randomizeQuestions: Boolean, $timeLimit: Int, $maxRetryAmount: Int, $bgColor: String, $color: String) {
  adminUpdateQuestionnaireExam(
    questionnaireId: $questionnaireId
    title: $title
    questionMethods: $questionMethods
    questionOrder: $questionOrder
    requireEmail: $requireEmail
    requireName: $requireName
    description: $description
    randomizeQuestions: $randomizeQuestions
    timeLimit: $timeLimit
    maxRetryAmount: $maxRetryAmount
    bgColor: $bgColor
    color: $color
  ) {
    ...ExamFragment
  }
}
    ${ExamFragmentFragmentDoc}`;
export type UpdateExamMutationFn = Apollo.MutationFunction<UpdateExamMutation, UpdateExamMutationVariables>;

/**
 * __useUpdateExamMutation__
 *
 * To run a mutation, you first call `useUpdateExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExamMutation, { data, loading, error }] = useUpdateExamMutation({
 *   variables: {
 *      questionnaireId: // value for 'questionnaireId'
 *      title: // value for 'title'
 *      questionOrder: // value for 'questionOrder'
 *      questionMethods: // value for 'questionMethods'
 *      requireEmail: // value for 'requireEmail'
 *      requireName: // value for 'requireName'
 *      description: // value for 'description'
 *      randomizeQuestions: // value for 'randomizeQuestions'
 *      timeLimit: // value for 'timeLimit'
 *      maxRetryAmount: // value for 'maxRetryAmount'
 *      bgColor: // value for 'bgColor'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useUpdateExamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExamMutation, UpdateExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExamMutation, UpdateExamMutationVariables>(UpdateExamDocument, options);
      }
export type UpdateExamMutationHookResult = ReturnType<typeof useUpdateExamMutation>;
export type UpdateExamMutationResult = Apollo.MutationResult<UpdateExamMutation>;
export type UpdateExamMutationOptions = Apollo.BaseMutationOptions<UpdateExamMutation, UpdateExamMutationVariables>;
export const DeleteQuestionnaireDocument = gql`
    mutation DeleteQuestionnaire($questionnaireSharedId: String!) {
  adminDeleteQuestionnaire(questionnaireSharedId: $questionnaireSharedId) {
    status
  }
}
    `;
export type DeleteQuestionnaireMutationFn = Apollo.MutationFunction<DeleteQuestionnaireMutation, DeleteQuestionnaireMutationVariables>;

/**
 * __useDeleteQuestionnaireMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionnaireMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionnaireMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionnaireMutation, { data, loading, error }] = useDeleteQuestionnaireMutation({
 *   variables: {
 *      questionnaireSharedId: // value for 'questionnaireSharedId'
 *   },
 * });
 */
export function useDeleteQuestionnaireMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionnaireMutation, DeleteQuestionnaireMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionnaireMutation, DeleteQuestionnaireMutationVariables>(DeleteQuestionnaireDocument, options);
      }
export type DeleteQuestionnaireMutationHookResult = ReturnType<typeof useDeleteQuestionnaireMutation>;
export type DeleteQuestionnaireMutationResult = Apollo.MutationResult<DeleteQuestionnaireMutation>;
export type DeleteQuestionnaireMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionnaireMutation, DeleteQuestionnaireMutationVariables>;
export const FetchQuestionnaireDocument = gql`
    query FetchQuestionnaire($questionnaireId: String, $questionnaireSharedId: String) {
  adminFetchQuestionnaire(
    questionnaireId: $questionnaireId
    questionnaireSharedId: $questionnaireSharedId
  ) {
    ... on QuestionnaireSurvey {
      ...SurveyFragment
    }
    ... on QuestionnaireExam {
      ...ExamFragment
    }
    ... on QuestionnaireQuiz {
      ...QuizFragment
    }
  }
}
    ${SurveyFragmentFragmentDoc}
${ExamFragmentFragmentDoc}
${QuizFragmentFragmentDoc}`;

/**
 * __useFetchQuestionnaireQuery__
 *
 * To run a query within a React component, call `useFetchQuestionnaireQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchQuestionnaireQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchQuestionnaireQuery({
 *   variables: {
 *      questionnaireId: // value for 'questionnaireId'
 *      questionnaireSharedId: // value for 'questionnaireSharedId'
 *   },
 * });
 */
export function useFetchQuestionnaireQuery(baseOptions?: Apollo.QueryHookOptions<FetchQuestionnaireQuery, FetchQuestionnaireQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchQuestionnaireQuery, FetchQuestionnaireQueryVariables>(FetchQuestionnaireDocument, options);
      }
export function useFetchQuestionnaireLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchQuestionnaireQuery, FetchQuestionnaireQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchQuestionnaireQuery, FetchQuestionnaireQueryVariables>(FetchQuestionnaireDocument, options);
        }
export function useFetchQuestionnaireSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchQuestionnaireQuery, FetchQuestionnaireQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchQuestionnaireQuery, FetchQuestionnaireQueryVariables>(FetchQuestionnaireDocument, options);
        }
export type FetchQuestionnaireQueryHookResult = ReturnType<typeof useFetchQuestionnaireQuery>;
export type FetchQuestionnaireLazyQueryHookResult = ReturnType<typeof useFetchQuestionnaireLazyQuery>;
export type FetchQuestionnaireSuspenseQueryHookResult = ReturnType<typeof useFetchQuestionnaireSuspenseQuery>;
export type FetchQuestionnaireQueryResult = Apollo.QueryResult<FetchQuestionnaireQuery, FetchQuestionnaireQueryVariables>;
export const PublicFetchQuestionnaireDocument = gql`
    query publicFetchQuestionnaire($questionnaireId: String, $questionnaireSharedId: String) {
  publicFetchQuestionnaire(
    questionnaireId: $questionnaireId
    questionnaireSharedId: $questionnaireSharedId
  ) {
    ... on QuestionnaireSurvey {
      ...SurveyFragment
    }
    ... on QuestionnaireExam {
      ...ExamFragment
    }
    ... on QuestionnaireQuiz {
      ...QuizFragment
    }
  }
}
    ${SurveyFragmentFragmentDoc}
${ExamFragmentFragmentDoc}
${QuizFragmentFragmentDoc}`;

/**
 * __usePublicFetchQuestionnaireQuery__
 *
 * To run a query within a React component, call `usePublicFetchQuestionnaireQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicFetchQuestionnaireQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicFetchQuestionnaireQuery({
 *   variables: {
 *      questionnaireId: // value for 'questionnaireId'
 *      questionnaireSharedId: // value for 'questionnaireSharedId'
 *   },
 * });
 */
export function usePublicFetchQuestionnaireQuery(baseOptions?: Apollo.QueryHookOptions<PublicFetchQuestionnaireQuery, PublicFetchQuestionnaireQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicFetchQuestionnaireQuery, PublicFetchQuestionnaireQueryVariables>(PublicFetchQuestionnaireDocument, options);
      }
export function usePublicFetchQuestionnaireLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicFetchQuestionnaireQuery, PublicFetchQuestionnaireQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicFetchQuestionnaireQuery, PublicFetchQuestionnaireQueryVariables>(PublicFetchQuestionnaireDocument, options);
        }
export function usePublicFetchQuestionnaireSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PublicFetchQuestionnaireQuery, PublicFetchQuestionnaireQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PublicFetchQuestionnaireQuery, PublicFetchQuestionnaireQueryVariables>(PublicFetchQuestionnaireDocument, options);
        }
export type PublicFetchQuestionnaireQueryHookResult = ReturnType<typeof usePublicFetchQuestionnaireQuery>;
export type PublicFetchQuestionnaireLazyQueryHookResult = ReturnType<typeof usePublicFetchQuestionnaireLazyQuery>;
export type PublicFetchQuestionnaireSuspenseQueryHookResult = ReturnType<typeof usePublicFetchQuestionnaireSuspenseQuery>;
export type PublicFetchQuestionnaireQueryResult = Apollo.QueryResult<PublicFetchQuestionnaireQuery, PublicFetchQuestionnaireQueryVariables>;
export const FetchQuestionnairesDocument = gql`
    query FetchQuestionnaires($latest: Boolean, $textFilter: String) {
  adminFetchQuestionnaires(latest: $latest, textFilter: $textFilter) {
    ... on QuestionnaireSurvey {
      ...SurveyFragment
    }
    ... on QuestionnaireExam {
      ...ExamFragment
    }
    ... on QuestionnaireQuiz {
      ...QuizFragment
    }
  }
}
    ${SurveyFragmentFragmentDoc}
${ExamFragmentFragmentDoc}
${QuizFragmentFragmentDoc}`;

/**
 * __useFetchQuestionnairesQuery__
 *
 * To run a query within a React component, call `useFetchQuestionnairesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchQuestionnairesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchQuestionnairesQuery({
 *   variables: {
 *      latest: // value for 'latest'
 *      textFilter: // value for 'textFilter'
 *   },
 * });
 */
export function useFetchQuestionnairesQuery(baseOptions?: Apollo.QueryHookOptions<FetchQuestionnairesQuery, FetchQuestionnairesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchQuestionnairesQuery, FetchQuestionnairesQueryVariables>(FetchQuestionnairesDocument, options);
      }
export function useFetchQuestionnairesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchQuestionnairesQuery, FetchQuestionnairesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchQuestionnairesQuery, FetchQuestionnairesQueryVariables>(FetchQuestionnairesDocument, options);
        }
export function useFetchQuestionnairesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FetchQuestionnairesQuery, FetchQuestionnairesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FetchQuestionnairesQuery, FetchQuestionnairesQueryVariables>(FetchQuestionnairesDocument, options);
        }
export type FetchQuestionnairesQueryHookResult = ReturnType<typeof useFetchQuestionnairesQuery>;
export type FetchQuestionnairesLazyQueryHookResult = ReturnType<typeof useFetchQuestionnairesLazyQuery>;
export type FetchQuestionnairesSuspenseQueryHookResult = ReturnType<typeof useFetchQuestionnairesSuspenseQuery>;
export type FetchQuestionnairesQueryResult = Apollo.QueryResult<FetchQuestionnairesQuery, FetchQuestionnairesQueryVariables>;
export const RespondQuestionnaireDocument = gql`
    mutation RespondQuestionnaire($answers: [AnswerDiscriminatorInput!]!, $questionnaireId: String!, $name: String, $email: String, $startedAt: DateTime!, $completedAt: DateTime!) {
  publicUpsertQuestionnaireResponse(
    questionnaireId: $questionnaireId
    email: $email
    name: $name
    completedAt: $completedAt
    startedAt: $startedAt
    answers: $answers
  ) {
    respondentToken
  }
}
    `;
export type RespondQuestionnaireMutationFn = Apollo.MutationFunction<RespondQuestionnaireMutation, RespondQuestionnaireMutationVariables>;

/**
 * __useRespondQuestionnaireMutation__
 *
 * To run a mutation, you first call `useRespondQuestionnaireMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRespondQuestionnaireMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [respondQuestionnaireMutation, { data, loading, error }] = useRespondQuestionnaireMutation({
 *   variables: {
 *      answers: // value for 'answers'
 *      questionnaireId: // value for 'questionnaireId'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      startedAt: // value for 'startedAt'
 *      completedAt: // value for 'completedAt'
 *   },
 * });
 */
export function useRespondQuestionnaireMutation(baseOptions?: Apollo.MutationHookOptions<RespondQuestionnaireMutation, RespondQuestionnaireMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RespondQuestionnaireMutation, RespondQuestionnaireMutationVariables>(RespondQuestionnaireDocument, options);
      }
export type RespondQuestionnaireMutationHookResult = ReturnType<typeof useRespondQuestionnaireMutation>;
export type RespondQuestionnaireMutationResult = Apollo.MutationResult<RespondQuestionnaireMutation>;
export type RespondQuestionnaireMutationOptions = Apollo.BaseMutationOptions<RespondQuestionnaireMutation, RespondQuestionnaireMutationVariables>;