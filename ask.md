## 1. Reality check

You are asking the right question now: how do we make the SaaS produce trustworthy product insights, not just attractive AI output?

For Product Signal, the prompt is part of the product—not the product itself.

No LLM prompt can guarantee perfect accuracy or consistency. The best you can build is a system that:

* uses the LLM for the parts it is good at,

* prevents unsupported claims,

* validates what it returns,

* and makes every insight traceable to the original feedback.

That is the difference between “AI generates a dashboard” and “AI helps a PM make a decision.”

I’ll evaluate this specifically against your application and then give you the prompt I would actually use.


### What I can verify about your app

Your deployed site is presented as Product Signal | AI Decision Workspace. That supports the product direction, but I cannot inspect its internal LLM pipeline or verify its actual output quality from the public page alone.

![](https://www.google.com/s2/favicons?domain=https://product-signal-lake.vercel.app\&sz=32)

AI Decision Workspace

So I’m not going to pretend I tested your backend. The recommendations below are based on the prompt you shared and the quality requirements of your feedback-analysis product.

## 2. What actually works

### The biggest correction: don't make the LLM responsible for everything

Your current prompt is trying to produce this:

```
Feedback
   ↓
LLM
   ↓
Themes + confidence + trend + segments + emerging issues
   ↓
Dashboard
```

That is too much trust in one step.

The better architecture is:

```
Customer feedback
   ↓
Normalize + validate input
   ↓
LLM: Understand and group problems
   ↓
Application: Validate IDs + counts
   ↓
LLM: Explain / enrich themes
   ↓
Application: Calculate real metrics
   ↓
LLM: Generate PM recommendations
   ↓
Dashboard
```

The LLM should be the reasoning engine. Your application should be the source of truth for data.

That is the most important architectural decision.

### What the LLM should do

|
Task

|

Why LLM is useful

|
| --- | --- |
|

Understand different wording

|

“Setup is confusing” ≈ “I don't know how to configure it”

|
|

Identify underlying problems

|

Goes beyond exact keyword matching

|
|

Group related feedback

|

Semantic understanding

|
|

Write problem statements

|

Converts raw complaints into PM language

|
|

Identify likely affected segments

|

Understands context

|
|

Explain why feedback belongs together

|

Useful for trust

|
|

Suggest possible root causes

|

Helps PM investigate

|
|

Suggest product opportunities

|

Helps move from insight to action

|

### What your application should do

|
Task

|

Why code should handle it

|
| --- | --- |
|

Count mentions

|

Exact arithmetic

|
|

Validate feedback IDs

|

Prevent broken traceability

|
|

Calculate trend percentages

|

Requires actual data

|
|

Calculate change over time

|

Requires dates

|
|

Calculate segment counts

|

Requires structured data

|
|

Detect new issues

|

Requires historical comparison

|
|

Validate JSON schema

|

Prevent malformed output

|
|

Deduplicate feedback

|

Prevent double counting

|
|

Store results

|

Reproducibility

|
|

Track model version

|

Auditability

|

This is the 80/20.

If you get these two things right:

1. LLM for semantic understanding

2. Code for deterministic analytics

You eliminate a huge amount of unreliable AI behavior.

## 3. What to avoid

### ❌ Your current `trend` definition is wrong

You wrote:

> `trend: 'up', 'down', or 'flat' based on language severity`

This should not exist in that form.

A PM reading “Up” will reasonably assume:

> “This problem is increasing over time.”

But your current input does not necessarily contain time.

Severity is not trend.

Instead:

JSON

```
{
  "trend": "unknown",
  "trendValue": null
}
```

when there is no historical data.

If you have dates and counts, then calculate the trend.

### ❌ `isEmerging` cannot be guessed from one complaint

You wrote:

> true if it is a new acute issue

That requires historical evidence.

A single new complaint is not necessarily an emerging issue.

Better:

```
isEmerging = true
```

only when:

* the issue is new in the current period, or

* its frequency has increased significantly, or

* there is explicit evidence that it recently appeared.

Otherwise:

```
isEmerging = false
```

or, if you want to preserve uncertainty:

```
isEmerging = null
```

Do not force a boolean when the evidence is missing.

### ❌ Don't ask AI to invent confidence

A score like `92` looks precise.

But what does 92 actually mean?

* 92% probability?

* 92% of users agree?

* 92% confidence in the theme?

* 92% confidence in the trend?

These are completely different things.

For your product, define it as:

> Theme confidence: How clearly the assigned feedback supports the theme, based on semantic consistency and specificity.

Then use it consistently.

Even better, include:

JSON

```
{
  "confidence": 85,
  "confidenceReason": "The feedback items consistently describe difficulty understanding the setup process."
}
```

Now the score has meaning.

## 4. The best prompt for your application

I would not use one giant prompt for everything.

I would use three stages.

### Stage 1 — Theme extraction

This is the core LLM task.

Edit

You are an expert AI Product Manager specializing in customer feedback analysis.

Your task is to identify recurring user problems from the provided feedback.

### Goal

Group feedback items that describe the same underlying problem, even when the wording is different.

### Rules for grouping

1. Group items only when they describe the same underlying problem.

2. Do not group feedback only because it contains the same keyword.

3. Keep meaningfully different problems separate.

4. Each feedback item must belong to exactly one theme.

5. Do not invent problems that are not supported by the feedback.

6. Prefer specific, actionable themes over broad categories.

7. If a theme has only one item, include it only when the issue is sufficiently distinct or important.

### Required output

For each theme, return:

* `title`: Short, specific problem title.

* `problemStatement`: One sentence describing what users struggle with.

* `feedbackIds`: Exact IDs of all feedback items assigned to this theme.

* `confidence`: Integer from 0-100 representing how clearly the assigned feedback supports this theme.

* `confidenceReason`: Brief explanation of why the feedback belongs together.

### Confidence guidance

* 90-100: Feedback clearly describes the same problem.

* 70-89: Feedback is strongly related but has some variation.

* 50-69: Possible theme, but evidence is mixed.

* Below 50: Do not create the theme unless necessary.

### Important

* Do not invent feedback IDs.

* Do not omit feedback items.

* Do not assign one feedback item to multiple themes.

* Return ONLY a valid JSON array of objects.

Feedback Data:
\(INSERT FEEDBACK HERE\)

This is the most important prompt in the entire system.

Get this right first.

### Stage 2 — Enrichment

Once themes are created, you can ask the LLM to enrich them.

Edit

You are an expert AI Product Manager.

Given the feedback themes and their supporting feedback items, enrich each theme with product-management context.

For each theme, return:

* `affectedSegment`: The user group explicitly supported by the feedback. If unknown, return `"Unknown"`.

* `rootCauseHypothesis`: A possible explanation for the problem, clearly labeled as a hypothesis.

* `severity`: `"low"`, `"medium"`, or `"high"` based on the language and impact described in the feedback.

* `priority`: `"low"`, `"medium"`, or `"high"` based on the evidence available.

* `recommendedAction`: A concise, actionable next step for the product team.

### Rules

* Do not invent user segments.

* Do not present hypotheses as confirmed facts.

* Do not infer business impact unless supported by the feedback.

* Do not calculate trends or percentages.

* If evidence is insufficient, return `"Unknown"`.

Return ONLY a valid JSON array of objects.

This is better than forcing the model to produce every field in one shot.

### Stage 3 — Deterministic analytics

This is where your application should take over.

For example:

JavaScript

```
const mentions = theme.feedbackIds.length;
```

For trend:

JavaScript

```
const trendValue = ((currentCount - previousCount) / previousCount) * 100;
```

For emerging:

JavaScript

```
const isEmerging = previousCount === 0 && currentCount > 0;
```

These are examples of application logic, not things the LLM should invent.

## 5. How to ensure quality, consistency, and accuracy

### The real answer: evaluation

You cannot just write a prompt and assume it works.

You need to test it against real feedback.

For your Product Signal app, I would create a small evaluation dataset:

```
100 real feedback items
    ↓
Manually grouped by you
    ↓
Expected themes
    ↓
Expected feedback IDs
    ↓
Expected counts
    ↓
Run LLM
    ↓
Compare output vs expected
```

This is called a golden dataset.

Example:

|
Feedback

|

Expected theme

|
| --- | --- |
|

“Onboarding is confusing”

|

Onboarding

|
|

“Setup is hard to understand”

|

Onboarding

|
|

“Dashboard is slow”

|

Performance

|
|

“Reports take too long to load”

|

Performance

|

Then test:

* Did the model group the right items?

* Did it miss any?

* Did it merge unrelated problems?

* Did it invent a theme?

* Did it preserve exact IDs?

* Did it count correctly?

That is how you measure quality.

Not by looking at one beautiful output.

### The most useful metrics

For your specific product:

|
Metric

|

What it tells you

|
| --- | --- |
|

Theme precision

|

Are grouped items actually related?

|
|

Theme recall

|

Did the model miss important problems?

|
|

ID accuracy

|

Are feedback items assigned correctly?

|
|

Coverage

|

Did every feedback item get handled?

|
|

Count accuracy

|

Do mentions match actual items?

|
|

Consistency

|

Does the same input produce similar themes?

|
|

Unsupported claim rate

|

How often does AI invent trends/segments?

|

The most important one for your product is probably:

> Are the themes useful and traceable to the actual feedback?

Because that is the PM's core job.

## 6. My honest recommendation for your Product Signal MVP

If I were building this as a real SaaS product, I would not start with:

> “AI predicts trends, detects emerging issues, and gives confidence scores.”

I would start with:

> “AI groups customer feedback into recurring problems and shows exactly which feedback supports each insight.”

Then add:

1. Theme grouping

2. Mention count

3. Feedback traceability

4. Affected segment

5. Severity

6. Priority

7. Trend only when historical data exists

8. Emerging issue only when historical data exists

That is a much stronger MVP.

### Why?

Because a PM can actually use it.

Example:

> Onboarding Complexity 18 mentions Affected segment: New Users Confidence: High \(View supporting feedback\)

Then:

> Recommended action: Simplify the setup flow and test onboarding with new users.

That is useful.

But:

> Onboarding Complexity Confidence: 93 Trend: +18% Emerging: true

when the data does not support those claims?

That is not trustworthy.

## 7. Final verdict

### Is your current prompt perfect?

No.

### Is it a good starting point?

Yes.

### Can it work consistently?

For basic theme grouping: yes, reasonably well.

### Can it guarantee accurate trends and emerging issues?

No, not without the right data and application logic.

### What should you do?

Keep the LLM focused on semantic understanding. Move deterministic analytics into code. Add validation and evaluation.

That is the real path to a reliable AI product.

And for your case study, this is actually a much stronger story than “I used an LLM to generate insights.”

Your story becomes:

> “I designed a feedback intelligence system that combines LLM-based semantic analysis with deterministic validation and analytics to produce traceable, actionable product insights.”

That sounds like real AI product design, because it is.

If you want, the next step should be to take your actual Josys feedback CSV and design the exact production-ready JSON schema + prompt + processing pipeline for Product Signal. That would be the most useful next move.


### One correction to the architecture above

There is one important detail: you do not necessarily need three separate LLM calls. For your MVP, that could add unnecessary cost and latency.

A better starting point is:

```
Feedback
   ↓
One LLM call: Group + explain
   ↓
Your code: Validate + calculate
   ↓
Dashboard
```

Then add a second LLM call only if you need richer PM recommendations.

Start simple. Measure quality. Add complexity only when it solves a real problem.

And one more thing: I would not claim your current application is production-ready based on the prompt alone. The next real step is to test the actual outputs against your Josys feedback dataset. That will tell us whether the system is genuinely useful or just looks good.

That is the honest answer.
