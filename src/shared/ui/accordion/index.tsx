import React, { FC } from 'react';

import { accordionDescriptionDataType } from 'pages/Home/data/accordion';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type PropsType = {
  accordionData: accordionDescriptionDataType
}

const ControlledAccordions: FC<PropsType> = ({accordionData}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {
        accordionData.map(data => (
        <Accordion expanded={expanded === `panel${data.id}`} onChange={handleChange(`panel${data.id}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              { data.pageName }
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              { data.shortDescription }
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              { data.fullDescription }
            </Typography>
          </AccordionDetails>
        </Accordion>
        ))
      }      
    </div>
  );
}

export default ControlledAccordions;
