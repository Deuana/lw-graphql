export const extractError = errorCode => ({
  'Form.UNFILLED': 'Por favor, preencha os campos obrigatórios.',
  'User.WRONG_CREDENTIALS': 'O usuário ou a senha estão incorretos.',
  'User.ALREADY_EXISTS': 'O usuário já existe.',
  'Weapon.ALREADY_EXISTS': 'O armamento já existe.',
}[errorCode]);
