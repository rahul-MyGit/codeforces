# Seed issues 
1. No Transaction Wrapping
=> database queries should be wrapped in transaction for data to be consistent 

2. Inefficient N+1 Query Pattern (lines 44-94)
  for (const problem of problemsData) {
    const existing = await prisma.problems.findFirst({...});  // Query 1
    // ...
    await prisma.problems.create({...});  // Query 2
  }
  This runs 2 queries per problem. With 30+ problems, that's 60+ queries. Consider batching or using upsert. 

=> don't really know about n+1 query prattern in prisma  

3. Hardcoded Admin User ID
=> solve this 

4. No Seed Reset/Cleanup Option
  There's no way to clean and re-seed. Useful for development.




# Schema Issues (schema.prisma)

  1. Missing @unique on Problems.title
  The seed assumes titles are unique (findFirst by title), but the schema doesn't enforce it. Add @unique or the migration name suggests you did this but it's not in the
  current schema.

  2. Language Enum Mismatch
  enum Language {
    CPP, RUST, JAVASCRIPT, PYTHON, JAVA
  }
  But seedData.ts includes "GO" and "TYPESCRIPT" which will fail if you try to use them with the Language enum.

  3. StarterCode.language Should Use the Enum
  model StarterCode {
    language String  // Should be: language Language
  }

  4. Missing Cascade Deletes
  VisibleTestCases, HiddenTestCases, Submission lack onDelete: Cascade. Deleting a problem leaves orphaned records.

  5. No Index on Frequently Queried Fields
  Missing indexes on Problems.title, Problems.problemType, etc.
