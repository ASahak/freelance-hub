import React from 'react';

export type IWithChildren<T> = { children: React.ReactNode } & T;
