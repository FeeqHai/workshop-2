import { Group, Burger, Box, Image, Container, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Header({ opened, toggle }) {
  const navigate = useNavigate();

  return (
    <Box h={60} p={0}>
      <Container  fluid  px={0} mx={80}  h="100%">
        <Group justify="space-between" align="center" h="100%">
          
          {/* 1. Logo Area */}
           <Image src="../src/assets/ipetro-logo.png" w={200} alt="IPETRO Logo" />

          {/* 2. Desktop Menu */}
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Button variant="default">Log Out</Button>
          {/* 3. Mobile Menu Button */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        
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
      </Container>
    </Box>
  );
}