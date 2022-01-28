import React from "react";
import { DummyFn } from "../../util/dummy";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form: React.FC<Props> = ({ ...props }) => {
  return <Component test="" {...props} onSubmit={props.onSubmit ?? DummyFn} />;
};

interface CompProps extends React.FormHTMLAttributes<HTMLFormElement> {
  test: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Component: React.FC<CompProps> = ({ children, ...props }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(e);
      }}
    >
      {children}
    </form>
  );
};

export default Form;
