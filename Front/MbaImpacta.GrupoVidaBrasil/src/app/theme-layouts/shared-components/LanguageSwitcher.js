import { useState } from "react";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setDefaultSettings } from "app/store/fuse/settingsSlice";

// Se incluir mais algum idioma
// necessário incluir a importação do locale no component de data
const languages = [
  {
    id: "pt-BR",
    title: "Português",
    name: "PT",
    flag: "br",
    language: "pt-BR",
  },
  {
    id: "en-US",
    title: "English",
    name: "EN",
    flag: "en",
    language: "en-US",
  },
];

function LanguageSwitcher() {
  const dispatch = useDispatch();

  const theme = useTheme();
  const { i18n } = useTranslation();
  const [menu, setMenu] = useState(null);

  const currentLng = languages.find((lng) => lng.id === i18n.language);

  const langMenuClick = (event) => {
    setMenu(event.currentTarget);
  };

  const langMenuClose = () => {
    setMenu(null);
  };

  function handleLanguageChange(lng) {
    const newLangDir = i18n.dir(lng.id);

    // Change Language
    i18n.changeLanguage(lng.id);

    // If necessary, change theme direction
    if (newLangDir !== theme.direction) {
      dispatch(setDefaultSettings({ direction: newLangDir }));
    }

    langMenuClose();
  }

  return (
    <>
      <Button className="h-40 w-64" onClick={langMenuClick} color="inherit">
        {currentLng && (
          <>
            <img
              className="min-w-20"
              src={`assets/images/flags/${currentLng.flag}.png`}
              alt={currentLng.title}
            />

            <Typography className="mx-4">{currentLng.name}</Typography>
          </>
        )}
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
            <ListItemIcon className="min-w-40">
              <img
                className="min-w-20"
                src={`assets/images/flags/${lng.flag}.png`}
                alt={lng.title}
              />
            </ListItemIcon>
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
