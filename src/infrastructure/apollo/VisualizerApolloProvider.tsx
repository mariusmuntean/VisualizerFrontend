import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

interface Props {
  children: ReactNode;
}

export const VisualizerApolloProvider = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
