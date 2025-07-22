import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  Chip,
  Button,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './Accessibility.css'

export default function Accessibility({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card sx={{ p: 3, m: 2 }}>
        <Typography>✅ No accessibility issues found!</Typography>
      </Card>
    );
  }

  const severityData = {
    critical: data.filter(d => getSeverity(d.score) === 'Critical').length,
    moderate: data.filter(d => getSeverity(d.score) === 'Moderate').length,
    minor: data.filter(d => getSeverity(d.score) === 'Minor').length,
  };

  const doughnutData = {
    labels: ['Critical', 'Moderate', 'Minor'],
    datasets: [
      {
        data: Object.values(severityData),
        backgroundColor: ['#e53935', '#fb8c00', '#43a047'],
      },
    ],
  };

  const scrollToElement = (selector) => {
    try {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.outline = '3px solid #e91e63';
        el.style.transition = 'outline 0.3s ease-in-out';

        // Remove highlight after 2 seconds
        setTimeout(() => {
          el.style.outline = '';
        }, 2000);
      } else {
        alert(`❌ Element not found for selector:\n${selector}`);
      }
    } catch (err) {
      alert(`❌ Invalid selector:\n${selector}`);
    }
  };

  return (
    <Box sx={{ m: 2 }} className= 'acessibility-box-div'>
      <Typography variant="h2" gutterBottom className='acessibility-h2'>
        ♿ Accessibility Issues
      </Typography>

      <Box sx={{ width: 300, mb: 3 }}>
        <Doughnut data={doughnutData} />
      </Box>

      {data.map((issue) => (
        <Accordion key={issue.id} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold' }}>{issue.title}</Typography>
            <Chip
              label={getSeverity(issue.score)}
              color={getChipColor(issue.score)}
              size="small"
              sx={{ ml: 2 }}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {issue.description}
            </Typography>

            {issue.displayValue && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Details:</strong> {issue.displayValue}
              </Typography>
            )}

            {issue.nodes && issue.nodes.length > 0 && (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Selector:</strong> {issue.nodes[0].selector}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => scrollToElement(issue.nodes[0].selector)}
                >
                  🔍 View Element
                </Button>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

function getSeverity(score) {
  if (score === 0) return 'Critical';
  if (score < 0.5) return 'Moderate';
  return 'Minor';
}

function getChipColor(score) {
  if (score === 0) return 'error';
  if (score < 0.5) return 'warning';
  return 'success';
}
