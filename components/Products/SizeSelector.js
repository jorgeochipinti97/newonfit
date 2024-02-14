import { Box, Button } from "@mui/material";

export const SizeSelector = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
      {sizes &&
        sizes.map((size) => (
          <Button
            key={size}
            size="small"
            color={selectedSize === size ? "secondary" : "primary"}
            onClick={() => onSelectedSize(size)}
            sx={{ m: 1 }}
          >
            {size}
          </Button>
        ))}
    </Box>
  );
};
