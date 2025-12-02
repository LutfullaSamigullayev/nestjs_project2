import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";

@Controller("upload")
export class UploadController {
  // single
  @Post("single")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: path.join(process.cwd(), "uploads"),
        filename: function (req, file, cb) {
          const uniquePerfix = `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`;
          cb(null, uniquePerfix);
        },
      }),
    })
  )
  singleFileUpload(@UploadedFile() file: Express.Multer.File) {
    return { file_path: `http://localhost:4001/uploads/${file.filename}` };
  }

  // multiple
  @Post("multiple")
  @UseInterceptors(
    FilesInterceptor("files", 10, {
      storage: diskStorage({
        destination: path.join(process.cwd(), "uploads"),
        filename: function (req, file, cb) {
          const uniquePerfix = `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`;
          cb(null, uniquePerfix);
        },
      }),
    })
  )
  multipleFileUpload(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map(
      (file) => `http://localhost:4001/uploads/${file.filename}`
    );
  }
}
