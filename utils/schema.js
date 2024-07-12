import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIInterview=pgTable('aiInterview', {
    id:serial('id').primaryKey(),
    jsonMockRes:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
});

export const UserAnswer=pgTable('userAnswer', {
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
    timeTaken:varchar('timeTaken')
});

export const AIAssessment=pgTable('aiAssessment', {
    id:serial('id').primaryKey(),
    jsonMockRes:text('jsonMockResp').notNull(),
    assessmentTopic:varchar('assessmentTopic').notNull(),
    assessmentQuestions:varchar('assessmentQuestions').notNull(),
    assessmentLevel:varchar('assessmentLevel').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
});

export const UserAssessment=pgTable('userAssessment', {
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
    timeTaken:varchar('timeTaken')
});
