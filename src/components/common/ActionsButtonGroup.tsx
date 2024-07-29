import React, { useState } from "react";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface ActionsButtonGroupProps {
    handleAction: (value: string) => void;
    selected?: number[]
}

const options = ["Valider", "Annuler", "No show"];

const ActionsButtonGroup: React.FC<ActionsButtonGroupProps> = ({handleAction, selected}) => {
  const [open, setOpen] = useState(false);
  const actionRef = React.useRef<() => void | null>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    const value = options[selectedIndex] === "Valider" ? "recovered" : options[selectedIndex] === "Annuler" ? "canceled" : "noShow"
    handleAction(value)
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        sx={{border: "1px solid #2F4558", color: "#5784BA"  }}

        ref={anchorRef}
        variant="solid"
        disabled={selected?.length === 0} // Disable the button if no items are selected
        aria-label="split button"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <IconButton
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select action"
          aria-haspopup="menu"
          onMouseDown={() => {
            // @ts-expect-error necessary
            actionRef.current = () => setOpen(!open);
          }}
          onKeyDown={() => {
            // @ts-expect-error necessary
            actionRef.current = () => setOpen(!open);
          }}
          onClick={() => {
            actionRef.current?.();
          }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </ButtonGroup>
      <Menu
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ActionsButtonGroup;

