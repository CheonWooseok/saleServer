type DBError =
  | "none_parameter"
  | "data_already_exist"
  | "data_too_long"
  | "server_shutdown"
  | "wrong_value"
  | "etc_error";

export default DBError;
