import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ success: false, message: 'Not authorized' });
    }
  };