import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    
    inverted ? : boolean; // mean can a dark in the background or give it a lighter background
    content ?: string;  // the content Text
}

export default function LoadingComponents({inverted  = true , content = 'loading...'}:Props) {
  return (
    <Dimmer active={true} inverted={inverted}>
        <Loader content={content} />
    </Dimmer>
  )
}
