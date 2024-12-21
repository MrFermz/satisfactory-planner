import { Accordion, AccordionDetails, AccordionSummary, Paper, Stack } from '@mui/material';
import { FC } from 'react';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

import { EXTRACTORS, GENERATORS, PRODUCTIONS } from '@data/buidings';
import { NodeCard } from './node-card';

export const NodePanel: FC = () => {
  return (
    <Stack
      component={Paper}
      position="absolute"
      top="50%"
      left={15}
      sx={{ transform: 'translateY(-50%)' }}
      zIndex={5}
    >
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreTwoToneIcon />}>Extractor</AccordionSummary>
        <AccordionDetails>
          {EXTRACTORS.map((extractor) => (
            <NodeCard
              key={extractor.type}
              data={extractor}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreTwoToneIcon />}>Production</AccordionSummary>
        <AccordionDetails>
          {PRODUCTIONS.map((production) => (
            <NodeCard
              key={production.type}
              data={production}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreTwoToneIcon />}>Generator</AccordionSummary>
        <AccordionDetails>
          {GENERATORS.map((generator) => (
            <NodeCard
              key={generator.type}
              data={generator}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
