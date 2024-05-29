import Client from 'ali-oss'
class AliyunSDK {
  private static instance: AliyunSDK | null = null
  private client: any

  private constructor(accessKeyId: string, accessKeySecret: string, stsToken: string) {
    // 在构造函数中初始化 client
    this.client = new Client({
      region: import.meta.env.VITE_OSS_ENDPOINT,
      stsToken,
      accessKeyId,
      accessKeySecret,

      // 填写Bucket名称，例如examplebucket。
      bucket: import.meta.env.VITE_OSS_BUCKET
    })
  }

  // 获取实例的静态方法
  public static getInstance(accessKeyId: string, accessKeySecret: string, stsToken: string): AliyunSDK {
    // 如果实例不存在，则创建一个新实例

    AliyunSDK.instance = new AliyunSDK(accessKeyId, accessKeySecret, stsToken)

    // 返回现有的实例
    return AliyunSDK.instance
  }

  // 上传文件
  public async uploadOSS(objectName: string, file: File): Promise<any> {
    try {
      const result = await this.client.put(objectName, file)
      console.log('上传成功:', result)
      return result
    } catch (error) {
      console.error('上传失败:', error)
      throw error
    }
  }
  // 下载文件
  public async downloadOSS(objectName: string): Promise<any> {
    try {
      const result = await this.client.get(objectName)
      console.log('下载成功:', result)
      return result
    } catch (error) {
      console.error('下载失败:', error)
      throw error
    }
  }

  // 初始化OSS
  public async initOSS(): Promise<any> {
    // 实现初始化逻辑
  }

  // urllib
  public async urllib(): Promise<any> {
    // 实现urllib逻辑
  }

  // 描述实例
  public async describeInstances(): Promise<any> {
    const params = {}

    return new Promise((resolve, reject) => {
      this.client
        .request('DescribeInstances', params, {
          method: 'GET'
        })
        .then(
          (result: any) => {
            resolve(result)
          },
          (ex: any) => {
            reject(ex)
          }
        )
    })
  }
}

export default AliyunSDK
