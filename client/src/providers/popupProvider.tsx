'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

import { type ChakraProps, useDisclosure } from '@chakra-ui/react';

import { useLiveStates, useStateWithCallback } from '@/hooks';

export interface PopupSettingsType {
  hideCloseIcon?: boolean;
  closeOnOverlayClick?: boolean;
  modalBodyProps?: ChakraProps;
  modalContainerProps?: ChakraProps;
  mobileDrawer?: boolean;
  isCenter?: boolean;
  afterOnClose?: () => void;
}

type IPopupData = Record<string, any>;
type IPopupTitle = (() => ReactNode) | string;

export interface INested {
  popupData: IPopupData;
  popupSettings: PopupSettingsType;
  popupTitle: IPopupTitle;
  popupType: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface PopupContextType {
  openPopup: (
    type: string,
    title: IPopupTitle,
    data?: IPopupData,
    popupSettings?: PopupSettingsType,
  ) => void;
  onCloseAsync: () => Promise<unknown>;
  onClose: () => void;
  onCloseComplete: () => void;
  onCloseWithNoAnimation: (cb: () => void) => void;
  popupData: IPopupData;
  popupSettings: PopupSettingsType;
  popupType: string;
  motionPreset: string;
  isOpen: boolean;
  popupTitle: IPopupTitle;
  nested: INested;
}

export const PopupContext = createContext<PopupContextType>({
  openPopup: () => void 0,
  onClose: () => void 0,
  onCloseComplete: () => void 0,
  onCloseWithNoAnimation: () => void 0,
  // eslint-disable-next-line
  onCloseAsync: async () => void 0,
  popupData: {},
  popupSettings: {},
  nested: {
    popupData: {},
    popupSettings: {},
    popupType: '',
    popupTitle: '',
    isOpen: false,
    onClose: () => void 0,
  },
  popupType: '',
  motionPreset: 'scale',
  isOpen: false,
  popupTitle: '',
});

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext);

  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupContext');
  }

  return context;
};

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const nestedDisclosure = useDisclosure();
  const [nested, setNested] = useState<INested | null>(null);
  const [popupType, setPopupType] = useState('');
  const [motionPreset, setMotionPreset] = useStateWithCallback('scale');
  const [popupTitle, setPopupTitle] = useState<IPopupTitle>('');
  const [popupData, setPopupData] = useState<Record<string, any>>({});
  const [popupSettings, setPopupSettings] = useState<PopupSettingsType>({});
  const [onCloseResolve, setOnCloseResolve] = useState<(() => void) | null>(
    null,
  );
  const liveStates = useLiveStates({
    nested,
  });

  const openPopup = (
    type: string,
    title: IPopupTitle,
    data?: Record<string, unknown>,
    popupSettings?: PopupSettingsType,
  ) => {
    if (data?.isNested) {
      nestedDisclosure.onOpen();
      setNested({
        popupData: data || {},
        popupSettings: popupSettings || {},
        popupType: type,
        popupTitle: title,
        isOpen: true, // nestedDisclosure.isOpen is async updatable state, so here it has not received updated true value yet
        onClose: nestedOnClose,
      });
      return;
    }

    onOpen();
    setPopupTitle(title ?? '');
    setPopupType(type);
    if (data) {
      setPopupData(data);
    }
    setPopupSettings(popupSettings || {});
  };

  const nestedOnClose = () => {
    nestedDisclosure.onClose();
    setNested((prevState) => ({ ...prevState, isOpen: false }) as INested); // nestedDisclosure.isOpen is async updatable state, so here it has not received updated false value yet
  };

  const onCloseComplete = () => {
    if (nested) {
      nested.popupSettings.afterOnClose?.();
      setNested(null);
    } else {
      popupSettings.afterOnClose?.();
      setPopupType('');
      setPopupTitle('');
      setPopupData({});
      setPopupSettings({});
    }

    setMotionPreset('scale');

    if (onCloseResolve) {
      onCloseResolve();
      setOnCloseResolve(null);
    }
  };

  const onCloseWithNoAnimation = (cb: () => void) => {
    setMotionPreset('none', () => {
      const _onClose = liveStates.current.nested ? nestedOnClose : onClose;

      _onClose();

      onCloseComplete();
      cb();
    });
  };

  const onCloseAsync = async () => {
    return new Promise<void>((resolve) => {
      setOnCloseResolve(() => resolve);
      const _onClose = liveStates.current.nested ? nestedOnClose : onClose;

      _onClose();
    });
  };

  return (
    <PopupContext.Provider
      value={{
        onCloseAsync,
        openPopup,
        onCloseComplete,
        onClose,
        onCloseWithNoAnimation,
        nested: nested || {
          popupData: {},
          popupSettings: {},
          popupType: '',
          popupTitle: '',
          isOpen: nestedDisclosure.isOpen,
          onClose: nestedOnClose,
        },
        popupData,
        popupSettings,
        motionPreset,
        popupType,
        popupTitle,
        isOpen,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
