// React
import { useState } from 'react';
// UI elems
import { Grid, GridItem, } from '@chakra-ui/react'

// My components
import Header from './components/Header'
import WelcomeText from './components/WelcomeText'
import Forms from './components/Forms'
import ViewData from './components/ViewData'

/**
 * Base page structure
 * @returns {React}
 */
export default function App() {
  const [step, setStep] = useState(0) // user steps on site, 0 - Welcome text, 1 - Forms ...
  const [data, setData] = useState({})

  return (
    <Grid
      h='100%'
      templateRows='max-content 1fr'
      templateColumns='1fr'
    >
      <GridItem>
        <Header />
      </GridItem>
      <GridItem h="100%">
        {
          step === 0
            ? <WelcomeText changeStep={setStep} />
            : step === 1
              ? <Forms saveData={setData} changeStep={setStep} />
              : step === 2
              ? <ViewData data={data} changeStep={setStep} />
              : null
        }

      </GridItem>
    </Grid>
  );
}
