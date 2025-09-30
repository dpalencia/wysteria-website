// This is a serverless function that fetches images from a Google Cloud Storage bucket
// It acts as a proxy to avoid CORS issues when fetching directly from the client

export default async function handler(req, res) {
  const bucketName = process.env.GALLERY_BUCKET_NAME || 'wysteria-gallery';
  const bucketUrl = `https://storage.googleapis.com/${bucketName}`;
  
  try {
    // Fetch the list of objects from the bucket
    const response = await fetch(`${bucketUrl}?prefix=`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }
    
    const data = await response.text();
    
    // Return the XML response as-is, letting the client parse itaka
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(data);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
}




