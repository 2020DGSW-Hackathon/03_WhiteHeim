package com.example.daesowiki.network

import com.example.daesowiki.model.request.LoginBody
import com.example.daesowiki.model.response.LoginData
import com.example.daesowiki.model.request.SignUpBody
import com.example.daesowiki.model.request.SearchKeyword
import com.example.daesowiki.model.response.ListData
import com.example.daesowiki.model.response.SignUpData
import retrofit2.Call
import retrofit2.http.*

interface Dao {

    @POST("/api/auth/login")
    fun login(
        @Body loginBody: LoginBody
    ) : Call<LoginData>

    @POST("/api/auth/register")
    fun signUp(
        @Body signUpBody: SignUpBody
    ) : Call<SignUpData>

    @GET("/api/post")
    fun search(
        @Query("keyword") keyword : String
    ) : Call<ListData>

    @GET("/api/post")
    fun list_get():Call<ListData>
}