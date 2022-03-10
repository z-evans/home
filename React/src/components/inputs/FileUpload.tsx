import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Colours from "../../style/Colours";

interface Props {
  onSelect: (acceptedFiles: File[]) => void;
}

const FileUpload: React.FC<Props> = ({ onSelect, ...props }) => {
  const { getRootProps } = useDropzone({
    onDrop: (acceptedFiles) => onSelect(acceptedFiles),
  });

  return (
    <StyledFileInput {...getRootProps()}>
      {props.children}
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )} */}
    </StyledFileInput>
  );
};

export default FileUpload;

const StyledFileInput = styled("div")`
  border: 1px solid ${Colours.default.ming};
  padding: 2em;
`;
