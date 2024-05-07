import { Box, Button } from "@mui/material";

export const SizeSelector = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
      {sizes &&
        sizes.map((size) => (
          <Button
            key={size}
            size="small"
            sx={{ border: "1px solid black", m: 1 }}
            color={selectedSize === size ? "secondary" : "primary"}
            onClick={() => onSelectedSize(size)}
          >
            {size}
          </Button>
        ))}
    </Box>
  );
};
