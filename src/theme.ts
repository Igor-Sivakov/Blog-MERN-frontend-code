import { createTheme, Shadows } from "@mui/material/styles"


export const theme = createTheme({
  shadows: [0, 1, 2, 3, 4, 6, 8, 12, 16, 24] as unknown as Shadows,
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
})





