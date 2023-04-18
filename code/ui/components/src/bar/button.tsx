import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from 'react';
import React, { forwardRef } from 'react';
import { styled, isPropValid } from '@storybook/theming';
import { transparentize } from 'polished';
import { auto } from '@popperjs/core';

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  href?: never;
  target?: never;
}
interface LinkProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  disabled?: void;
  href: string;
}

const isLink = (obj: {
  props: ButtonProps | LinkProps;
  ref: ForwardedRef<HTMLButtonElement> | ForwardedRef<HTMLAnchorElement>;
}): obj is { props: LinkProps; ref: ForwardedRef<HTMLAnchorElement> } => {
  return typeof obj.props.href === 'string';
};

const isButton = (obj: {
  props: ButtonProps | LinkProps;
  ref: ForwardedRef<HTMLButtonElement> | ForwardedRef<HTMLAnchorElement>;
}): obj is { props: ButtonProps; ref: ForwardedRef<HTMLButtonElement> } => {
  return typeof obj.props.href !== 'string';
};

function ForwardRefFunction(p: LinkProps, r: ForwardedRef<HTMLAnchorElement>): ReactElement;
function ForwardRefFunction(p: ButtonProps, r: ForwardedRef<HTMLButtonElement>): ReactElement;
function ForwardRefFunction(
  { children, ...rest }: ButtonProps | LinkProps,
  ref: ForwardedRef<HTMLButtonElement> | ForwardedRef<HTMLAnchorElement>
) {
  const o = { props: rest, ref };
  if (isLink(o)) {
    return (
      <a ref={o.ref} {...o.props}>
        {children}
      </a>
    );
  }
  if (isButton(o)) {
    return (
      <button ref={o.ref} type="button" {...o.props}>
        {children}
      </button>
    );
  }
  throw new Error('invalid props');
}
type ButtonLike<P = {}> = ForwardRefExoticComponent<
  Omit<ButtonProps, 'ref'> & RefAttributes<HTMLButtonElement> & P
>;

type LinkLike<P = {}> = ForwardRefExoticComponent<
  Omit<LinkProps, 'ref'> & RefAttributes<HTMLAnchorElement> & P
>;

const ButtonOrLink: ButtonLike | LinkLike = forwardRef(ForwardRefFunction) as ButtonLike | LinkLike;

ButtonOrLink.displayName = 'ButtonOrLink';

export interface TabButtonProps {
  active?: boolean;
  textColor?: string;
}

export const TabButton = styled(ButtonOrLink, { shouldForwardProp: isPropValid })<TabButtonProps>(
  {
    whiteSpace: 'normal',
    display: 'inline-flex',
    overflow: 'hidden',
    verticalAlign: 'top',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textDecoration: 'none',

    '&:empty': {
      display: 'none',
    },
  },
  ({ theme }) => ({
    padding: '0 15px',
    transition: 'color 0.2s linear, border-bottom-color 0.2s linear',
    height: 40,
    lineHeight: '12px',
    cursor: 'pointer',
    background: 'transparent',
    border: '0 solid transparent',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    fontWeight: 'bold',
    fontSize: 13,

    '&:focus': {
      outline: '0 none',
      borderBottomColor: theme.color.secondary,
    },
  }),
  ({ active, textColor, theme }) =>
    active
      ? {
          color: textColor || theme.barSelectedColor,
          borderBottomColor: theme.barSelectedColor,
        }
      : {
          color: textColor || theme.barTextColor,
          borderBottomColor: 'transparent',
        }
);
TabButton.displayName = 'TabButton';

export interface IconButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const IconButton = styled(ButtonOrLink, { shouldForwardProp: isPropValid })<IconButtonProps>(
  () => ({
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: 4,
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: 13,
    fontWeight: 'bold',
    height: 28,
    justifyContent: 'center',
    marginTop: 6,
    padding: '8px 7px',

    '& > svg': {
      width: 14,
    },
  }),
  ({ active, theme }) =>
    active
      ? {
          backgroundColor: theme.background.hoverable,
          color: theme.color.secondary,
        }
      : {},
  ({ disabled, theme }) =>
    disabled
      ? {
          opacity: 0.5,
          cursor: 'not-allowed',
        }
      : {
          '&:hover, &:focus-visible': {
            background: transparentize(0.88, theme.color.secondary),
            color: theme.color.secondary,
          },
          '&:focus-visible': {
            outline: auto, // Ensures links have the same focus style
          },
          '&:focus:not(:focus-visible)': {
            outline: 'none',
          },
        }
);
IconButton.displayName = 'IconButton';

const IconPlaceholder = styled.div(({ theme }) => ({
  width: 14,
  height: 14,
  backgroundColor: theme.appBorderColor,
  animation: `${theme.animation.glow} 1.5s ease-in-out infinite`,
}));

const IconButtonSkeletonWrapper = styled.div(() => ({
  marginTop: 6,
  padding: 7,
  height: 28,
}));

export const IconButtonSkeleton = () => (
  <IconButtonSkeletonWrapper>
    <IconPlaceholder />
  </IconButtonSkeletonWrapper>
);
