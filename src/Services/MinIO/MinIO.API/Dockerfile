FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.1-stretch AS build
WORKDIR /src
COPY ["MinIO.API.csproj", "MinIO/MinIO.API/"]
RUN dotnet restore "MinIO/MinIO.API/MinIO.API.csproj"
COPY . MinIO/MinIO.API/
WORKDIR /src/MinIO/MinIO.API
RUN dotnet build "MinIO.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MinIO.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MinIO.API.dll"]