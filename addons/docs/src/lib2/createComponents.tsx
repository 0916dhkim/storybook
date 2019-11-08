import { PropText } from '@storybook/components';
import React, { ReactNode } from 'react';

// TODO: since text is now optionnal, no point in not have it any "props"é
export function createPropText(text?: string, props: Record<string, any> = {}): ReactNode {
  return <PropText text={text} {...props} />;
}
