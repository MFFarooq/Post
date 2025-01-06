import { NextResponse } from "next/server";

export async function GET(request) {
    return NextResponse.json({Request:"Get request fired"})
        
}

export async function POST(request) {

    const body = await request.json();
    console.log(body)
    return NextResponse.json({Request:"Post request fired"})
        
}

export async function PUT(request) {

    const body = await request.json();
    console.log(body)
    return NextResponse.json({Request: "Put request fired"})
        
}

export async function DELETE(request) {

    const body = await request.json();
    console.log(body);
    return NextResponse.json({Request:"Delete request fired"})
        
}