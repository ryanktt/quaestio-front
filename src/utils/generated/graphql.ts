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
  maxRetryAmount?: InputMaybe<Scalars['Float']['input']>;
  passingGradePercent?: InputMaybe<Scalars['Float']['input']>;
  questions: Array<QuestionDiscriminatorInput>;
  randomizeQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  timeLimit?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
};


export type MutationAdminCreateQuestionnaireQuizArgs = {
  questions: Array<QuestionDiscriminatorInput>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};


export type MutationAdminCreateQuestionnaireSurveyArgs = {
  questions: Array<QuestionDiscriminatorInput>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};


export type MutationAdminUpdateQuestionnaireExamArgs = {
  maxRetryAmount?: InputMaybe<Scalars['Float']['input']>;
  passingGradePercent?: InputMaybe<Scalars['Float']['input']>;
  questionMethods?: InputMaybe<Array<QuestionMethodInput>>;
  questionnaireId: Scalars['String']['input'];
  randomizeQuestions?: InputMaybe<Scalars['Boolean']['input']>;
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  timeLimit?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationAdminUpdateQuestionnaireQuizArgs = {
  questionMethods?: InputMaybe<Array<QuestionMethodInput>>;
  questionnaireId: Scalars['String']['input'];
  requireEmail?: InputMaybe<Scalars['Boolean']['input']>;
  requireName?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAdminUpdateQuestionnaireSurveyArgs = {
  questionMethods?: InputMaybe<Array<QuestionMethodInput>>;
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
  correct: Scalars['Boolean']['input'];
  feedbackAfterSubmit?: InputMaybe<Scalars['String']['input']>;
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
  authToken: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminFetchQuestionnaire?: Maybe<Questionnaire>;
  adminFetchQuestionnaires: Array<Questionnaire>;
  fetchAdmin?: Maybe<Admin>;
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
};


export type QueryFetchAdminArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Question = {
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  required: Scalars['Boolean']['output'];
  showCorrectAnswer: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
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
  title: Scalars['String']['output'];
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
  title: Scalars['String']['input'];
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
  title: Scalars['String']['output'];
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
  title: Scalars['String']['input'];
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
  title: Scalars['String']['output'];
  type: QuestionType;
  updatedAt: Scalars['DateTime']['output'];
  weight?: Maybe<Scalars['Int']['output']>;
};

export type QuestionTextInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  feedbackAfterSubmit?: InputMaybe<Scalars['String']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  showCorrectAnswer?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
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
  title: Scalars['String']['output'];
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
  title: Scalars['String']['input'];
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
  createdAt: Scalars['DateTime']['output'];
  latest: Scalars['Boolean']['output'];
  metrics: QuestionnaireMetrics;
  questions: Array<Question>;
  requireEmail: Scalars['Boolean']['output'];
  requireName: Scalars['Boolean']['output'];
  sharedId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: QuestionnaireType;
  updatedAt: Scalars['DateTime']['output'];
  user: Admin;
};

export type QuestionnaireExam = Questionnaire & SchemaBaseInterface & {
  __typename?: 'QuestionnaireExam';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  latest: Scalars['Boolean']['output'];
  maxRetryAmount?: Maybe<Scalars['Float']['output']>;
  metrics: QuestionnaireMetrics;
  passingGradePercent?: Maybe<Scalars['Float']['output']>;
  questions: Array<Question>;
  randomizeQuestions: Scalars['Boolean']['output'];
  requireEmail: Scalars['Boolean']['output'];
  requireName: Scalars['Boolean']['output'];
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
  avgAnswerTime: Scalars['Int']['output'];
  avgAttempCount: Scalars['Int']['output'];
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
  createdAt: Scalars['DateTime']['output'];
  latest: Scalars['Boolean']['output'];
  metrics: QuestionnaireMetrics;
  questions: Array<Question>;
  requireEmail: Scalars['Boolean']['output'];
  requireName: Scalars['Boolean']['output'];
  sharedId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: QuestionnaireType;
  updatedAt: Scalars['DateTime']['output'];
  user: Admin;
};

export type QuestionnaireSurvey = Questionnaire & SchemaBaseInterface & {
  __typename?: 'QuestionnaireSurvey';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  latest: Scalars['Boolean']['output'];
  metrics: QuestionnaireMetrics;
  questions: Array<Question>;
  requireEmail: Scalars['Boolean']['output'];
  requireName: Scalars['Boolean']['output'];
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