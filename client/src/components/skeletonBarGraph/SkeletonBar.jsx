import React from 'react';
import { Skeleton, Box, Typography } from '@mui/material';

const SkeletonBar = () => {
  return (
    <Box>
      <Typography variant="subtitle1" mb={1}>
        Loading chart...
      </Typography>

      <Box
        display="flex"
        alignItems="flex-end"
        gap={3}
        height={150}
        width="100%"
      >
        {[180, 200, 160, 190, 170].map((height, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            animation="wave"
            width={40}
            height={height}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SkeletonBar;
