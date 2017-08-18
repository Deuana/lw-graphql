export const extractError = errorCode => ({
  'Form.UNFILLED': 'Por favor, preencha os campos obrigatórios.',
  'User.WRONG_CREDENTIALS': 'O usuário ou a senha estão incorretos.',
}[errorCode]);
