import io
from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
from pypdf import PdfReader

router = APIRouter()

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 # 10 MB limit

@router.post("/upload-image")
async def upload_and_process_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    if file.size and file.size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=413, detail="File size exceeds maximum allowed limit (10MB)")

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=413, detail="File size exceeds maximum allowed limit (10MB)")

    image = Image.open(io.BytesIO(contents))
    
    # Process image: resize to max 800x800 thumbnail
    image.thumbnail((800, 800))
    output_buffer = io.BytesIO()
    image.save(output_buffer, format="JPEG", quality=85)
    
    return {
        "filename": file.filename,
        "format": image.format,
        "width": image.width,
        "height": image.height,
        "size_bytes": len(output_buffer.getvalue()),
        "status": "processed_and_thumbnail_generated",
    }

@router.post("/parse-pdf")
async def parse_pdf_document(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    if file.size and file.size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=413, detail="File size exceeds maximum allowed limit (10MB)")

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=413, detail="File size exceeds maximum allowed limit (10MB)")

    pdf_reader = PdfReader(io.BytesIO(contents))
    
    num_pages = len(pdf_reader.pages)
    first_page_text = pdf_reader.pages[0].extract_text() if num_pages > 0 else ""

    return {
        "filename": file.filename,
        "total_pages": num_pages,
        "extracted_preview": first_page_text[:300],
        "status": "parsed_successfully",
    }
