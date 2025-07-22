import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Chip,
  Link,
  Grow,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import TimelineIcon from '@mui/icons-material/Timeline';
import UpdateIcon from '@mui/icons-material/Update';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CircleIcon from '@mui/icons-material/Circle';

// Helper to parse string to number (for logic)
const parseValue = (valueStr) => {
  if (!valueStr) return 0;
  const clean = valueStr.replace(/,/g, '').trim();
  const match = clean.match(/([\d.]+)\s*(ms|s)?/i);
  if (!match) return 0;
  const [, num, unit] = match;
  const value = parseFloat(num);
  return unit === 'ms' ? value / 1000 : value;
};

// Get status color
const getStatusColor = (valueStr) => {
  const val = parseValue(valueStr);
  if (valueStr.includes('ms')) return val < 200 ? 'success' : val < 500 ? 'warning' : 'error';
  if (val < 1) return 'success';
  if (val < 2.5) return 'warning';
  return 'error';
};

const metricDetails = {
  firstContentfulPaint: {
    title: 'First Contentful Paint',
    desc: 'This tells you how long it takes for the first part of your page (like text or image) to appear on screen. The faster this happens, the quicker the user feels something is loading.',
    link: 'https://web.dev/fcp/',
    icon: <AccessTimeIcon />,
  },
  largestContentfulPaint: {
    title: 'Largest Contentful Paint',
    desc: 'This checks how long it takes for the biggest visible element on your page (like a banner or main image) to load. A quick LCP means the main content is loading fast.',
    link: 'https://web.dev/lcp/',
    icon: <LeaderboardIcon />,
  },
  totalBlockingTime: {
    title: 'Total Blocking Time',
    desc: 'This measures how much time the browser is too busy to respond to user actions (like clicks). Less blocking time means your page feels smoother and faster to use.',
    link: 'https://web.dev/tbt/',
    icon: <UpdateIcon />,
  },
  cumulativeLayoutShift: {
    title: 'Cumulative Layout Shift',
    desc: 'This tells if things on your page suddenly move around while loading (like buttons or text jumping). Less shifting means the page looks stable and is easier to use.',
    link: 'https://web.dev/cls/',
    icon: <ViewInArIcon />,
  },
  speedIndex: {
    title: 'Speed Index',
    desc: 'This shows how quickly content becomes visible while the page loads. A lower score means the page looks ready faster, even if it’s still loading in the background.',
    link: 'https://web.dev/speed-index/',
    icon: <SpeedIcon />,
  },
  interactive: {
    title: 'Time to Interactive',
    desc: 'This measures how long before your page is ready to use — when buttons, links, and forms all work properly. A fast time here means users can start using your site quickly.',
    link: 'https://web.dev/interactive/',
    icon: <TimelineIcon />,
  },
};


export default function MetricCards({ metrics }) {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#888', fontWeight: 500 }}>
        Core Web Vitals
      </Typography>

      <Grid container spacing={2}>
        {Object.entries(metrics).map(([key, value], index) => {
          const detail = metricDetails[key] || {};
          const displayName = detail.title || key.replace(/([A-Z])/g, ' $1');
          const status = getStatusColor(value);

          return (
            <Grow in={true} timeout={300 + index * 150} key={key}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  elevation={4}
                  sx={{
                    padding: 2,
                    borderLeft: '5px solid',
                    borderColor:
                      status === 'success'
                        ? '#4caf50'
                        : status === 'warning'
                        ? '#ff9800'
                        : '#f44336',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <CircleIcon
                      fontSize="small"
                      sx={{
                        color:
                          status === 'success'
                            ? '#4caf50'
                            : status === 'warning'
                            ? '#ff9800'
                            : '#f44336',
                        mr: 1,
                      }}
                    />
                    {detail.icon && <Box mr={1}>{detail.icon}</Box>}
                    <Typography variant="subtitle1" fontWeight={600}>
                      {displayName}
                    </Typography>
                  </Box>

                  <Chip
                    label={value}
                    color={
                      status === 'success'
                        ? 'success'
                        : status === 'warning'
                        ? 'warning'
                        : 'error'
                    }
                    variant="outlined"
                    sx={{ fontSize: '0.95rem', mb: 1, fontWeight: 600 }}
                  />

                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {detail.desc}{' '}
                    {detail.link && (
                      <Link
                        href={detail.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        Learn more
                      </Link>
                    )}
                  </Typography>
                </Paper>
              </Grid>
            </Grow>
          );
        })}
      </Grid>
    </Box>
  );
}
