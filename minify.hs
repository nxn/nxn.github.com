-- Copyright (c) 2011 Ernie Wieczorek, http://ie.corrutped.me
--
-- Permission is hereby granted, free of charge, to any person obtaining a copy
-- of this software and associated documentation files (the "Software"), to deal
-- in the Software without restriction, including without limitation the rights
-- to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
-- copies of the Software, and to permit persons to whom the Software is
-- furnished to do so, subject to the following conditions:
--
-- The above copyright notice and this permission notice shall be included in
-- all copies or substantial portions of the Software.
--
-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
-- THE SOFTWARE.



-- EW (02/26/2011):
-- Simple script that uses Google's Closure Compiler REST API -- for minifying
-- javascript files. It's one of the few that I ran into that seems to handle
-- semicolon insertion when needed.

import System.IO
import Data.Maybe
import Network.HTTP
import Network.URI

-- List of files in order in which they should be included
files = [ "Resume.js"
        , "Background.js"
        , "Button.js"
        , "MainMenu.js"
        , "SubMenu.js"
        , "MainPage.js"
        , "SubPage.js"
        ]
sourceDir = "src"
compilationLevel = "SIMPLE_OPTIMIZATIONS"
outputFormat = "text"
outputInfo = "compiled_code"
outputFile = "resume_min.js"

-- Goes through list of files, appends the directory prefix, and concatenates
-- them together
getCode :: [String] -> IO String
getCode fs = concat `fmap` mapM (readFile . getPath) fs
  where getPath f = sourceDir ++ "/" ++ f

-- Given a string of code it forms a compilation request that will be sent to
-- the closure compiler service
getCompilationRequest code = Request
  { rqURI = uri
  , rqMethod = POST
  , rqHeaders = [ contentType, contentLength ]
  , rqBody = body
  }
  where
    body = urlEncodeVars
      [ ("js_code", code)
      , ("compilation_level", compilationLevel)
      , ("output_format", outputFormat)
      , ("output_info", outputInfo)
      ]
    contentLength = mkHeader HdrContentLength . show . length $ body
    contentType = mkHeader HdrContentType "application/x-www-form-urlencoded"
    uri = fromJust . parseURI $ "http://closure-compiler.appspot.com/compile"

-- Get the code, create the compilation request, send it, get the response, and
-- write the resulting files to disk
main = getCode files
       >>= simpleHTTP . getCompilationRequest
       >>= getResponseBody
       >>= writeFile outputFile
