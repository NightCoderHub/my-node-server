// server.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const crypto = require("crypto"); // 导入 crypto 模块

const app = express();
const PORT = 3000;

// 初始化内存存储
global.refreshTokens = [];

// 密钥（请更换为更安全的字符串）
const ACCESS_TOKEN_SECRET = "your-access-token-secret-key";
const REFRESH_TOKEN_SECRET = "your-refresh-token-secret-key";

// CORS 配置（允许前端访问）
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:4173", "http://127.0.0.1", "http://localhost:8080"], // 替换为你的前端地址
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// 中间件
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());

const RefreshToken = require("./models/RefreshToken");

// 移除内存存储的refreshTokens数组（原代码）
// const refreshTokens = [];

// 统一响应格式封装
function successResponse(data = null, message = "操作成功", code = 200) {
  return { code, message, data };
}

function errorResponse(message = "系统异常", code = 500, data = null) {
  return { code, message, data };
}

// POST /oauth2/token - 用户登录并获取 access_token + refresh_token
app.post("/oauth2/token", async (req, res) => {
  // 改为async函数
  const { username, password } = req.body;
  // 本地模拟用户数据
  const mockUsers = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user", password: "user123", role: "user" },
  ];
  // 本地验证用户
  const user = mockUsers.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(400).json(errorResponse("用户名或密码错误", 4012));
  }

  // 生成 access_token
  const accessToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: "10h" });

  // 生成 refresh_token（本地存储）
  const refreshTokenStr = jwt.sign({ id: user.id, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  // 存储到内存（替代数据库）
  if (!global.refreshTokens) global.refreshTokens = [];
  global.refreshTokens.push(refreshTokenStr);

  res.json(
    successResponse(
      {
        access_token: accessToken,
        refresh_token: refreshTokenStr,
      },
      "登录成功"
    )
  );
});

// POST /oauth2/refresh-token - 使用 refresh_token 获取新的 access_token
app.post("/oauth2/refresh-token", async (req, res) => {
  // 改为async函数
  const { refresh_token } = req.body;

  // 本地模拟用户数据（与登录接口保持一致）
  const mockUsers = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user", password: "user123", role: "user" },
  ];

  try {
    // 1. 验证 refresh_token 是否存在于内存中
    if (!global.refreshTokens || !global.refreshTokens.includes(refresh_token)) {
      return res.status(401).json(errorResponse("无效的 refresh token", 401));
    }

    // 2. 验证 refresh_token 签名并解码用户信息
    const decoded = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);

    // 3. 从本地模拟数据中查找用户
    const user = mockUsers.find(u => u.id === decoded.id && u.username === decoded.username);
    if (!user) {
      return res.status(401).json(errorResponse("用户不存在", 401));
    }

    // 4. 生成新的 access_token
    const newAccessToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: "10h" });

    res.json(
      successResponse(
        {
          access_token: newAccessToken,
        },
        "token 刷新成功"
      )
    );
  } catch (err) {
    // JWT 验证失败（过期或无效）
    res.status(200).json(errorResponse("refresh token 已过期或无效", 401));
  }
});

// POST /oauth2/logout - 注销，移除数据库中的refresh_token
app.post("/oauth2/logout", async (req, res) => {
  // 改为async函数
  const { refresh_token } = req.body;

  // 检查内存存储是否初始化
  if (!global.refreshTokens) {
    global.refreshTokens = [];
  }

  // 查找并移除refresh_token
  const initialLength = global.refreshTokens.length;
  global.refreshTokens = global.refreshTokens.filter(token => token !== refresh_token);

  // 判断是否成功移除
  if (global.refreshTokens.length < initialLength) {
    res.json(successResponse(null, "注销成功"));
  } else {
    res.json(errorResponse("refresh token不存在", 404));
  }
});

// GET /user/info - 获取当前登录用户的信息
app.get("/user/info", authenticateToken, async (req, res) => {
  // 本地模拟用户数据
  const mockUsers = [
    { id: 1, username: "admin", role: "admin", nickname: "系统管理员", email: "admin@example.com" },
    { id: 2, username: "user", role: "user", nickname: "普通用户", email: "user@example.com" },
  ];

  const user = mockUsers.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json(errorResponse("用户不存在", 404));
  }

  res.json(successResponse(user, "获取用户信息成功"));
});

// 引入 menu 数据（添加在数据字典引入之后）
const { mockMenus } = require("./src/menus/mockMenus");
// 添加菜单接口示例（根据实际需求扩展）
app.get("/get-menu-list", authenticateToken, (req, res) => {
  // 移除 async 关键字
  // 基于用户角色过滤菜单（保持原有权限控制逻辑）
  const userRole = req.user.role; // 从token中获取用户角色

  // 过滤菜单并移除null值
  res.json(successResponse(mockMenus, "获取菜单列表成功"));
});

// 身份验证中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json(errorResponse("未提供 token", 401));
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded; // 将用户信息附加到请求中
    next();
  } catch (err) {
    res.status(401).json(errorResponse("无效的 access token", 401));
  }
}

// 受保护的 REST API 示例
app.get("/api/secure-data", authenticateToken, (req, res) => {
  res.json(
    successResponse(
      {
        message: "你已访问受保护的数据",
        user: req.user,
      },
      "操作成功"
    )
  );
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const DICT_COLLECTION = require("./src/dictionaries/dataDicts.js");
// GET /api/dictionaries - 获取数据字典（支持获取单个或所有字典）
app.get("/api/dictionaries", authenticateToken, async (req, res) => {
  try {
    const { keywords, pageNum = 1, pageSize = 10 } = req.query;
    let result = [...DICT_COLLECTION];

    // 关键词搜索功能
    if (keywords && keywords.trim() !== '') {
      const keyword = keywords.toLowerCase().trim();
      result = result.filter(item =>
        item.dictCode.toLowerCase().includes(keyword) ||
        item.dictName.toLowerCase().includes(keyword) ||
        (item.remark && item.remark.toLowerCase().includes(keyword))
      );
    }

    // 分页处理
    const total = result.length;
    const page = parseInt(pageNum, 10);
    const size = parseInt(pageSize, 10);
    const startIndex = (page - 1) * size;
    const endIndex = page * size;
    const list = result.slice(startIndex, endIndex);

    res.json(successResponse({
      total, // 总条数
      pageNum: page, // 当前页码
      pageSize: size, // 每页条数
      list // 当前页数据
    }, `获取数据字典成功`));
  } catch (err) {
    console.error("Error in /api/dictionaries:", err);
    res.status(500).json(errorResponse("获取数据字典失败", 500));
  }
});

// 引入 menu 数据（添加在数据字典引入之后）
const { systemMenu, permissionData } = require("./src/menus/menuData");

// GET /api/menu-data - 获取 menuData.js 中的菜单数据（受保护接口）
app.get("/api/menu-data", authenticateToken, (req, res) => {
  res.json(successResponse([...systemMenu, ...permissionData], "获取菜单数据成功"));
});

// GET /api/permissions - 获取用户权限（前端调用fetchPermissions对应此接口）
app.get("/api/permissions", authenticateToken, (req, res) => {
  const permissions = ["user:add", "user:edit", "report:view:monthly", "admin"];
    res.json(successResponse(permissions, "获取用户权限成功"));
});

// GET /api/dictionaries/items - 获取特定数据字典的具体项
app.get("/api/dictionaries/items", authenticateToken, (req, res) => {
  try {
    const { dictCode } = req.query;

    if (!dictCode) {
      return res.status(400).json(errorResponse("dictCode 参数为必填项", 400));
    }

    const dictionary = DICT_COLLECTION.find(item => item.dictCode === dictCode);

    if (!dictionary) {
      return res.status(404).json(errorResponse(`未找到 dictCode 为 ${dictCode} 的数据字典`, 404));
    }

    // 直接返回dictList数组
    res.json(successResponse(dictionary.dictList, `获取数据字典项成功`));
  } catch (err) {
    console.error("Error in /api/dictionaries/items:", err);
    res.status(500).json(errorResponse("获取数据字典项失败", 500));
  }
});
app.get("/api/permissions", authenticateToken, (req, res) => {
  // 延迟2秒（2000毫秒）返回数据
  setTimeout(() => {
    const permissions = ["user:add", "user:edit", "report:view:monthly", "admin"];
    res.json(successResponse(permissions, "获取用户权限成功"));
  }, 2000);
});
