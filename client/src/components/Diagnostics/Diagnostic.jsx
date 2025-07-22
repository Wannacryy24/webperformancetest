import React from 'react';
import diagIcon from '../../assets/analytics.png'
import './Diagnostics.css'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Tooltip,
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import LanguageIcon from '@mui/icons-material/Language';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StorageIcon from '@mui/icons-material/Storage';

const metricMeta = {
  numRequests:  { label: 'Num Requests',   icon: <LanguageIcon color="primary" /> },
  numScripts:   { label: 'Num Scripts',    icon: <DataObjectIcon color="secondary" /> },
  numStylesheets:{label:'Num Stylesheets', icon: <InsertChartIcon color="info" /> },
  numFonts:     { label: 'Num Fonts',      icon: <StorageIcon color="action" /> },
  numTasks:     { label: 'Num Tasks',      icon: <ScheduleIcon color="warning" /> },
  numTasksOver10ms:  { label: '>10ms Tasks', icon: <ScheduleIcon color="warning" /> },
  numTasksOver25ms:  { label: '>25ms Tasks', icon: <ScheduleIcon color="warning" /> },
  numTasksOver50ms:  { label: '>50ms Tasks', icon: <ScheduleIcon color="warning" /> },
  numTasksOver100ms: { label: '>100ms Tasks',icon: <ScheduleIcon color="warning" /> },
  numTasksOver500ms: { label: '>500ms Tasks',icon: <ScheduleIcon color="error" /> },
  rtt:          { label: 'RTT',            icon: <ScheduleIcon color="error" /> },
  maxRtt:       { label: 'Max RTT',        icon: <ScheduleIcon color="error" /> },
  throughput:   { label: 'Throughput',     icon: <SpeedIcon color="success" /> },
  maxServerLatency: { label: 'Max Server Latency', icon: <SpeedIcon color="error" /> },
  totalByteWeight:  { label: 'Total Byte Weight',  icon: <StorageIcon color="info" /> },
  totalTaskTime:    { label: 'Total Task Time',    icon: <ScheduleIcon color="warning" /> },
  mainDocumentTransferSize: { label: 'Main Doc Size', icon: <StorageIcon color="info" /> },
};

function formatBytes(num) {
  if (num == null || isNaN(num)) return '—';
  if (num >= 1024 * 1024) return (num / (1024 * 1024)).toFixed(2) + ' MB';
  if (num >= 1024) return (num / 1024).toFixed(1) + ' KB';
  return num + ' B';
}

function formatMs(num) {
  if (num == null || isNaN(num)) return '—';
  return Number(num).toFixed(0) + ' ms';
}

function formatGeneric(num) {
  if (num == null || isNaN(num)) return '—';
  return Number.isInteger(num) ? num : Number(num).toFixed(1);
}

function displayValue(key, val) {
  const k = key.toLowerCase();
  if (k.includes('rtt') || k.includes('latency') || k.includes('time')) return formatMs(val);
  if (k.includes('byte') || k.includes('size') || k.includes('throughput')) return formatBytes(val);
  if (k.includes('tasks')) {
    // some task counts are actually byte sizes in your original code; here assume count unless clearly bytes
    return formatGeneric(val);
  }
  return formatGeneric(val);
}

export default function Diagnostics({ data }) {
  if (!data) return <Typography>No diagnostics data available.</Typography>;

  // Normalize to array & filter out unknown keys if desired
  const metrics = Object.entries(data).map(([k, v]) => {
    const meta = metricMeta[k] || { label: k, icon: <InsertChartIcon color="disabled" /> };
    return {
      key: k,
      label: meta.label,
      icon: meta.icon,
      value: displayValue(k, v),
    };
  });

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
        my: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: '#ffffff',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={1}>
          <img src={diagIcon} alt="" className='diagnostic-component-icon'/>
          Diagnostics
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 2,
          }}
        >
          {metrics.map(m => (
            <Tooltip title={m.label} key={m.key}>
              <Box
                sx={{
                  border: '1px solid #e0e6ec',
                  borderRadius: 2,
                  p: 1.5,
                  bgcolor: '#f9fbfd',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  minHeight: 64,
                }}
              >
                <Box sx={{ mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  {m.icon}
                  <Typography variant="caption" fontWeight={600} color="text.primary">
                    {m.label}
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={700} color="primary.main">
                  {m.value}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
