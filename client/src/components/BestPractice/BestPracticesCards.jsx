import React, { useState } from 'react';
import {
  Grid, Card, CardContent, Typography, Box, Button, Link, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './BestPracticesCards.css'

const severityLevels = {
  'uses-http': 'critical',
  'image-aspect-ratio': 'medium',
  'unsized-images': 'medium',
  'doctype': 'low',
  'password-inputs-can-be-pasted-into': 'info',
};

const remediationTips = {
  'uses-http': {
    tip: 'Serve content over HTTPS for better security.',
    snippet: `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`,
  },
  'image-aspect-ratio': {
    tip: 'Ensure image width and height preserve aspect ratio.',
    snippet: `<img src="..." width="600" height="400" alt="...">`,
  },
  'unsized-images': {
    tip: 'Define width/height or use aspect-ratio in CSS.',
    snippet: `img { aspect-ratio: 16 / 9; }`,
  },
  'doctype': {
    tip: 'Add <!DOCTYPE html> at the top of your HTML.',
    snippet: `<!DOCTYPE html>`,
  },
  'password-inputs-can-be-pasted-into': {
    tip: 'Allow password managers to paste passwords.',
    snippet: `<input type="password" />`,
  },
};

export default function BestPracticesIssues({ issues }) {
  const [filter, setFilter] = useState('all');

  const handleFilter = (_, newValue) => {
    if (newValue) setFilter(newValue);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const filteredIssues = issues.filter((issue) => {
    if (filter === 'all') return true;
    const level = severityLevels[issue.id] || 'low';
    return level === filter;
  });

  return (
    <Box classname='best-practice-box-div'>
      <Box mb={2}>
        <Typography variant="h5" gutterBottom>
          🧪 Best Practice Issues
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilter}
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="critical">Critical</ToggleButton>
          <ToggleButton value="medium">Medium</ToggleButton>
          <ToggleButton value="low">Low</ToggleButton>
          <ToggleButton value="info">Info</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={2}>
        {filteredIssues.map((issue) => {
          const tipData = remediationTips[issue.id] || {};
          const level = severityLevels[issue.id] || 'low';
          const borderColor = {
            critical: 'red',
            medium: 'orange',
            low: 'gray',
            info: 'blue',
          }[level];

          return (
            <Grid item xs={12} md={6} lg={4} key={issue.id}>
              <Card variant="outlined" sx={{ borderLeft: `6px solid ${borderColor}` }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <ErrorOutlineIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6">{issue.title}</Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {issue.description}
                  </Typography>

                  {tipData.tip && (
                    <>
                      <Typography variant="subtitle2">Fix:</Typography>
                      <Typography variant="body2" mb={1}>
                        {tipData.tip}
                      </Typography>
                    </>
                  )}

                  {tipData.snippet && (
                    <Box
                      component="pre"
                      sx={{
                        bgcolor: '#f5f5f5',
                        p: 1,
                        borderRadius: 1,
                        fontSize: '0.85rem',
                        whiteSpace: 'pre-wrap',
                        mb: 1,
                      }}
                    >
                      {tipData.snippet}
                      <Button
                        size="small"
                        onClick={() => handleCopy(tipData.snippet)}
                        startIcon={<ContentCopyIcon />}
                        sx={{ mt: 1 }}
                      >
                        Copy
                      </Button>
                    </Box>
                  )}

                  {issue.learnMore && (
                    <Link
                      href={issue.learnMore}
                      target="_blank"
                      rel="noopener"
                      variant="body2"
                    >
                      🔗 Learn more
                    </Link>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
