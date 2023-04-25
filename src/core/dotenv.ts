import dotenv from 'dotenv'


export const initDotenv = () => {
  const argv = process.argv 

  console.log("参数", argv[0], argv[1], argv[2])

  const mode = argv[2] === '--mode' ? argv[3] : ''

  console.log(mode)

  const envFile = mode ? `.env.${mode}`: '.env'

  dotenv.config({path: envFile})

}

