/**
 * Checks the file-type of the given file whether it is an zip file.
 * @param file The file which will bechecked.
 * @returns true if it is a zip file, false otherwise.
 */
export function isZipFile(file: File): boolean {
  return (
    file.type == 'application/zip' ||
    file.type == 'application/x-zip-compressed'
  );
}

  // /**
  //  * Checks if the first file in the uploadedFiles array contains the identifying file of the service with the given serviceName
  //  *
  //  * @param serviceName - The serviceName constant for which a data-download zip is expected
  //  *
  //  * @author: Simon (scg@mail.upb.de)
  //  *
  //  */
  // validateFiles(selectedApp: AppType) {
  //   const file = this.uploadedFiles[0];

  //   this.loadZipFile(file).then((zip: any) => {
  //     if (selectedApp == this.appType.Instagram) {
  //       const foundFile = zip.files[instaIDFilename];

  //       if (foundFile == null) {
  //         this.errorMsg =
  //           'Please select a valid zip-file that you downloaded from Instagram!';
  //         this.uploadDialogVisible.set(true);
  //       } else {
  //         this.setSelectedFileName(file.name);
  //       }
  //     } else if (selectedApp == this.appType.Spotify) {
  //       const foundFile = zip.files[spotIDFilename]; //TODO: this file check does not work yet, look at jszip docs
  //       if (foundFile == null) {
  //         this.errorMsg =
  //           'Please select a valid zip-file that you downloaded from Spotify!';
  //         this.uploadDialogVisible.set(true);
  //       } else {
  //         this.setSelectedFileName(file.name);
  //       }
  //     } else if (selectedApp == this.appType.Facebook) {
  //       const foundFile = zip.files[faceIDFilename];

  //       if (foundFile == null) {
  //         this.errorMsg =
  //           'Please select a valid zip-file that you downloaded from Facebook!';
  //         this.uploadDialogVisible.set(true);
  //       } else {
  //         this.setSelectedFileName(file.name);
  //       }
  //     }
  //   });
  // }
