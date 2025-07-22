// utils/extractBestPractices.js

function extractBestPracticesIssues(audits, category) {
  if (!category || !category.auditRefs || !audits) return [];

  return Object.entries(audits)
    .filter(([id, audit]) => {
      return (
        audit.score !== 1 &&
        audit.scoreDisplayMode !== 'notApplicable' &&
        category.auditRefs.some(ref => ref.id === id)
      );
    })
    .map(([id, audit]) => ({
      id,
      title: audit.title,
      description: audit.description,
      tip: audit.helpText,
      displayValue: audit.displayValue || null,
    }));
}

module.exports = extractBestPracticesIssues;
