import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";

@Controller("upload")
export class UploadController {
  @Post("single")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: path.join(process.cwd(), "uploads"),
        filename: function(req, file, cb) {
            const uniquePerfix = `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
            cb(null, uniquePerfix)
        }
      }),
    })
  )
  singleFileUpload(@UploadedFile() file: Express.Multer.File) {
    return {file_path: `http://localhost:4001/uploads/${file.fieldname}`}
  }
}
