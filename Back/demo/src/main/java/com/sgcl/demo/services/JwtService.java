package com.sgcl.demo.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
@Service
public class JwtService {


    private static final String SECRET_KEY= "1234567890098765432112345678900812345678900987654321123456789008";

    
    public String getToken(UserDetails user){
        return getToken(new HashMap<>(), user);
    }

    private String getToken(Map<String,Object> extraClaims, UserDetails user){

        return Jwts
        .builder()
        .setClaims(extraClaims)
        .setSubject(user.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis()+1000*86400))
        .signWith(getKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    private Key getKey() {
        byte[] keyBytes=Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getEmailFromToken(String token) {
        return getCLaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username=getEmailFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Claims getAllClaims(String token){
        return Jwts
            .parserBuilder()
            .setSigningKey(getKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public <T> T getCLaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date getExpiration(String token){
        return getCLaim(token, Claims::getExpiration);

    }

    private boolean isTokenExpired(String token){
        return getExpiration(token).before(new Date());
    }

    
}
