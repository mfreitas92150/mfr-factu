import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type Props = {
  tooltip: string;
  icon: string;
  link?: string;
  className?: string;
  onClick?: () => void;
};

const IconTool = ({ tooltip, link, onClick, icon, className }: Props) => {
  if (link && onClick) throw new Error();

  const button = (
    <Button onClick={onClick} className={className} variant="outline-primary">
      <i className={`fa fa-lg fa-${icon}`} />
    </Button>
  );

  let content = link ? (
    <LinkContainer to={link}>{button}</LinkContainer>
  ) : (
    button
  );

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="fc">{tooltip}</Tooltip>}
    >
      {content}
    </OverlayTrigger>
  );
};

export default IconTool;
