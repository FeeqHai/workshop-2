import { Group, Burger, Box, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Header({ opened, toggle }) {
  const navigate = useNavigate();

  return (
    <Box h="100%" px="md">
      {/* justify="space-between" pushes the two inner Groups apart.
         - Left Group: Contains Desktop Burger + Logo
         - Right Group: Contains Mobile Burger
      */}
      <Group justify="space-between" h="100%">
        
        {/* --- LEFT SIDE CONTENTS --- */}
        <Group>
          {/* 1. DESKTOP BURGER 
             visibleFrom="sm" -> Only shows on screens larger than 768px
          */}
          <Burger 
            opened={opened} 
            onClick={toggle} 
            visibleFrom="sm" 
            size="sm" 
            aria-label="Toggle navigation"
          />

          {/* Logo */}
          <Box 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
            onClick={() => navigate('/dashboard')}
          >
             <Image 
               src="src\assets\ipetro-logo.png" 
               w={150} 
               fit="contain" 
               alt="IPETRO Logo" 
             />
          </Box>
        </Group>


        {/* --- RIGHT SIDE CONTENTS --- */}
        <Group>
          {/* 2. MOBILE BURGER
             hiddenFrom="sm" -> Only shows on screens smaller than 768px
          */}
          <Burger 
            opened={opened} 
            onClick={toggle} 
            hiddenFrom="sm" 
            size="sm" 
            aria-label="Toggle navigation"
          />
        </Group>
        
      </Group>
    </Box>
  );
}