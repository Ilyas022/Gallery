declare namespace Express {
  interface Request {
    userId: string
    author?: string
  }
}

declare namespace jwt {
  interface JwtPayload {
    _id: string
  }
}
