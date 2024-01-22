import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import jwtService from "../../auth/services/jwtService";

const schema = yup.object().shape({
  // email: yup
  //   .string()
  //   .email("You must enter a valid email")
  //   .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function ClassicSignInPage() {
  const { t } = useTranslation();
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const userRef = useRef("");

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue("cpf", "12345678901", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("password", "12345", { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit({ cpf, password }) {
    jwtService
      .signInWithCpfAndPassword(cpf, password)
      .then((user) => {
        userRef.current = cpf;
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: "manual",
            message: error.message,
          });
        });
      });
  }

  return (
    <div
      className="flex flex-col flex-auto items-center sm:justify-center min-w-0"
      style={{
        backgroundImage: "url(/assets/images/background.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-120" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            {t("Login.signin")}
          </Typography>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t("Usuario.CPF")}
                  autoFocus
                  type="cpf"
                  error={!!errors.cpf}
                  helperText={errors?.cpf?.message}
                  variant="outlined"
                  required
                  fullWidth
                  inputProps={{ maxLength: 11 }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label={t("Login.senha")}
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="primary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              {t("Login.signin")}
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicSignInPage;
