import api from '@/services/api'

interface S3ImageUploadResponse {
  path: string
}

export const s3ImageUpload = async (formData: FormData) => {
  return api.post<S3ImageUploadResponse>('/aws/s3/upload', formData)
}
